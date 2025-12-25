import puppeteer from 'puppeteer';
import { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3000'; // Adjust if your dev server port differs
const OUTPUT_DIR = path.join(__dirname, '../report_output');
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'screenshots');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR);

const SCENARIOS = [
    {
        section: 'PART A: Service Booking Flow',
        items: [
            { name: '1. Service List / Home Page', url: `${BASE_URL}/#/`, filename: '1_home.png' },
            { name: '2. Service Details Page', url: `${BASE_URL}/#/service/svc-001`, filename: '2_service_details.png' },
            { name: '3. Booking Form / Scheduling Page', url: `${BASE_URL}/#/booking/svc-001`, filename: '3_booking.png' },
            { name: '4. Payment Method Page', url: `${BASE_URL}/#/payment/svc-001`, filename: '4_payment.png' },
            { name: '5. Booking Confirmation Page', url: `${BASE_URL}/#/confirmation`, filename: '5_confirmation.png' },
        ]
    },
    {
        section: 'PART B: Worker Module',
        items: [
            { name: '1. Worker Status / Assigned Job Screen', url: `${BASE_URL}/#/worker`, filename: '6_worker_job.png' },
            { name: '2. Real-Time Map Tracking Screen', url: `${BASE_URL}/#/tracking`, filename: '7_tracking.png' },
            // Note: In this demo, user view and worker view might share components or routes. 
            // We capture the tracking page again for the 'User View' context if it visually differs, 
            // or we can navigate to a specific state if implemented.
            { name: '3. User View: Service in Progress', url: `${BASE_URL}/#/tracking`, filename: '8_user_tracking.png' },
            { name: '4. Service Completion Screen', url: `${BASE_URL}/#/completion`, filename: '9_completion.png' },
        ]
    }
];

async function captureScreenshots() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: { width: 430, height: 932 } // iPhone 14 Pro Max size for mobile view
    });
    const page = await browser.newPage();

    console.log('Capturing screenshots...');
    
    // Process Scenarios
    for (const section of SCENARIOS) {
        console.log(`\nProcessing ${section.section}...`);
        for (const item of section.items) {
            console.log(`  - Navigating to ${item.name} (${item.url})...`);
            try {
                await page.goto(item.url, { waitUntil: 'networkidle0' });
                // Add a small delay for animations/renders
                await new Promise(r => setTimeout(r, 1000));
                
                const filePath = path.join(SCREENSHOT_DIR, item.filename);
                await page.screenshot({ path: filePath });
                console.log(`    Saved to ${item.filename}`);
            } catch (e) {
                console.error(`    FAILED to capture ${item.name}:`, e.message);
            }
        }
    }

    await browser.close();
    console.log('\nAll screenshots captured.');
}

async function generateWordDoc() {
    console.log('\nGenerating Word Document...');
    
    const docChildren = [
        new Paragraph({
            text: "KampungKu Interface Design Case Study",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
        }),
        new Paragraph({ text: "" }), // Spacer
    ];

    for (const section of SCENARIOS) {
        docChildren.push(
            new Paragraph({
                text: section.section,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            })
        );

        for (const item of section.items) {
            const imagePath = path.join(SCREENSHOT_DIR, item.filename);
            
            if (fs.existsSync(imagePath)) {
                const imageBuffer = fs.readFileSync(imagePath);
                
                docChildren.push(
                    new Paragraph({
                        text: item.name,
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 200, after: 100 }
                    }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: imageBuffer,
                                transformation: {
                                    width: 300, // Scale down for doc
                                    height: 650,
                                },
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({ text: "" }) // Spacer
                );
            }
        }
    }

    const doc = new Document({
        sections: [{
            children: docChildren,
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(path.join(OUTPUT_DIR, "KampungKu_Report.docx"), buffer);
    console.log(`Word document saved to: ${path.join(OUTPUT_DIR, "KampungKu_Report.docx")}`);
}

async function generatePDF() {
    console.log('\nGenerating PDF...');
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    let htmlContent = `
    <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                h1 { text-align: center; color: #333; }
                h2 { color: #555; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 40px; }
                .item { margin-bottom: 50px; text-align: center; page-break-inside: avoid; }
                .item h3 { margin-bottom: 20px; color: #666; }
                img { border: 1px solid #ddd; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-height: 800px; width: auto; }
            </style>
        </head>
        <body>
            <h1>KampungKu Interface Design Case Study</h1>
    `;

    for (const section of SCENARIOS) {
        htmlContent += `<h2>${section.section}</h2>`;
        for (const item of section.items) {
            const imagePath = path.join(SCREENSHOT_DIR, item.filename);
            if (fs.existsSync(imagePath)) {
                // Embed image as base64
                const imageBuffer = fs.readFileSync(imagePath);
                const base64Image = imageBuffer.toString('base64');
                const dataUri = `data:image/png;base64,${base64Image}`;
                
                htmlContent += `
                    <div class="item">
                        <h3>${item.name}</h3>
                        <img src="${dataUri}" />
                    </div>
                `;
            }
        }
    }

    htmlContent += `</body></html>`;

    await page.setContent(htmlContent);
    await page.pdf({
        path: path.join(OUTPUT_DIR, "KampungKu_Report.pdf"),
        format: 'A4',
        printBackground: true,
        margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' }
    });

    await browser.close();
    console.log(`PDF document saved to: ${path.join(OUTPUT_DIR, "KampungKu_Report.pdf")}`);
}

async function main() {
    await captureScreenshots();
    await generateWordDoc();
    await generatePDF();
    console.log('\nDone! Check the "report_output" directory.');
}

main().catch(console.error);
