import React from 'react';
import { Printer, Download } from 'lucide-react';
import Swal from 'sweetalert2';

const ParticipantsFeedback = () => {

    const handlePrint = () => {
        document.title = "Participants_Feedback_Report";
        window.print();
    };

    const handleDownloadPdf = () => {
        Swal.fire({ title: 'Generating PDF...', text: 'Please wait while your document is being prepared.', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        const generatePDF = () => {
            const element = document.getElementById('printable-participants-feedback');

            // Hide buttons briefly during capture
            const actionButtons = element.querySelector('.print\\:hidden');
            if (actionButtons) actionButtons.style.display = 'none';

            // Shrink briefly to fit on one PDF page
            const originalZoom = element.style.zoom;
            element.style.zoom = '0.7';

            const opt = {
                margin: 5,
                filename: 'Participants_Feedback_Report.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            window.html2pdf().set(opt).from(element).save().then(() => {
                // Restore UI
                if (actionButtons) actionButtons.style.display = '';
                element.style.zoom = originalZoom;
                Swal.close();
                Swal.fire('Success!', 'PDF downloaded successfully.', 'success');
            }).catch((err) => {
                if (actionButtons) actionButtons.style.display = '';
                element.style.zoom = originalZoom;
                Swal.close();
                Swal.fire('Error', 'Failed to generate PDF.', 'error');
            });
        };

        if (window.html2pdf) {
            generatePDF();
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            document.body.appendChild(script);
            script.onload = generatePDF;
        }
    };

    return (
        <div id="printable-participants-feedback" className="min-h-screen bg-gray-100 py-2 print:py-0 print:bg-white text-black font-sans">
            <style>
                {`
                @media print {
                    @page { margin: 5mm; }
                    #printable-participants-feedback {
                        zoom: 0.85; 
                    }
                    #printable-participants-feedback table {
                        font-size: 13px;
                    }
                    #printable-participants-feedback td, #printable-participants-feedback th {
                        padding-top: 3px !important;
                        padding-bottom: 3px !important;
                    }
                    #printable-participants-feedback textarea {
                        min-height: 0 !important;
                        height: auto !important;
                    }
                }
                `}
            </style>

            <div className="mx-auto bg-white p-6 md:p-8 print:p-0 shadow-xl print:shadow-none max-w-[1000px] print:max-w-none">

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mb-6 print:hidden">
                    <button
                        onClick={handleDownloadPdf}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-1.5 px-6 rounded-md shadow transition-colors"
                    >
                        <Download size={20} />
                        Download PDF
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-6 rounded-md shadow transition-colors"
                    >
                        <Printer size={20} />
                        Print Form
                    </button>
                </div>

                {/* Header Section */}
                <div className="text-center mb-6 leading-tight">
                    <h1 className="text-lg md:text-xl font-bold uppercase underline underline-offset-4 mb-2">PARTICIPANTS FEEDBACK REPORT</h1>
                    <p className="text-sm md:text-base">(To be filled in by all individual participants separately)</p>
                    <p className="text-sm md:text-base">(All columns should be filled)</p>
                </div>

                {/* Main Table */}
                <div className="w-full overflow-x-auto print:overflow-visible">
                    <table className="w-full border-collapse border border-black text-sm">
                        <tbody>
                            {/* Standard Rows */}
                            {[
                                { no: "1", label: "Name of the participating MSE unit", type: "input" },
                                { no: "2", label: "Address of Plant", type: "textarea", rows: 2 },
                                { no: "3", label: "Name of Proprietor / Partner / Director", type: "input" },
                                { no: "4", label: "Mobile number of Proprietor / Partner / Director", type: "input" },
                                { no: "5", label: "E-mail ID of Proprietor / Partner / Director", type: "input" },
                                { no: "6", label: "Website of the participating MSE unit", type: "input" },
                                { no: "7", label: "Name, Venue, and Duration of event", type: "textarea", rows: 2 },
                            ].map((row, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-2 py-2 text-center w-8 md:w-12 align-top">{row.no}</td>
                                    <td className="border border-black px-2 py-2 w-[40%] align-top leading-snug">{row.label}</td>
                                    <td className="border border-black px-2 py-2 w-[55%] align-top">
                                        {row.type === "textarea" ? (
                                            <textarea className="w-full min-h-[3rem] outline-none bg-transparent resize-none print:resize-none" rows={row.rows}></textarea>
                                        ) : (
                                            <input type="text" className="w-full min-h-[1.5rem] outline-none bg-transparent" />
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {/* Row 8: Comments with bold subtext */}
                            <tr>
                                <td className="border border-black px-2 py-3 text-center w-8 md:w-12 align-top">8</td>
                                <td className="border border-black px-2 py-3 w-[40%] align-top leading-snug">
                                    <span className="font-bold block mb-2">Comments of the participant regarding benefits of participation in the event</span>
                                    <span className="font-bold block">[about 200 words along with photographs of event]</span>
                                </td>
                                <td className="border border-black px-2 py-3 w-[55%] align-top">
                                    <textarea className="w-full min-h-[5rem] outline-none bg-transparent resize-none print:resize-none" rows={4}></textarea>
                                </td>
                            </tr>

                            {/* Row 9-11 */}
                            {[
                                { no: "9", label: "Number of visitors in the event", type: "input" },
                                { no: "10", label: "Number and value (in INR) of export inquiries generated in the event", type: "input" },
                                { no: "11", label: "Details of business finalized / orders booked in the event.", type: "textarea", rows: 2 },
                                { no: "12", label: "Other achievements such as joint ventures, technology transfer agreements, etc. (give details)", type: "textarea", rows: 3 },
                                { no: "13", label: "Would you like to participate again in the event? If yes, reason for the same.", type: "textarea", rows: 2 },
                            ].map((row, index) => (
                                <tr key={`batch2-${index}`}>
                                    <td className="border border-black px-2 py-3 text-center w-8 md:w-12 align-top">{row.no}</td>
                                    <td className="border border-black px-2 py-3 w-[40%] align-top font-bold leading-snug">{row.label}</td>
                                    <td className="border border-black px-2 py-3 w-[55%] align-top">
                                        {row.type === "textarea" ? (
                                            <textarea className="w-full min-h-[4rem] outline-none bg-transparent resize-none print:resize-none" rows={row.rows}></textarea>
                                        ) : (
                                            <input type="text" className="w-full min-h-[1.5rem] outline-none bg-transparent" />
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {/* Row 14: Nested Table */}
                            <tr>
                                <td className="border border-black px-2 py-3 text-center w-8 md:w-12 align-top">14</td>
                                <td className="border border-black px-2 py-3 align-top leading-snug" colSpan={2}>
                                    <div className="mb-3">
                                        Details of technologies noticed in the event which would be useful for MSMEs in India (copies of the brochures and other relevant literature may be attached as separate sheet):
                                    </div>
                                    <table className="w-full border-collapse border border-black mt-2">
                                        <thead>
                                            <tr>
                                                <th className="border border-black px-2 py-1.5 w-[20%] text-left font-bold text-sm">Country</th>
                                                <th className="border border-black px-2 py-1.5 w-[20%] text-left font-bold text-sm">Field/Sector</th>
                                                <th className="border border-black px-2 py-1.5 w-[30%] text-left font-bold text-sm">Description of Technology</th>
                                                <th className="border border-black px-2 py-1.5 w-[30%] text-left font-bold text-sm">Contact details (phone number/e-mails etc.) of the company</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-black px-2 py-1 align-top"><input type="text" className="w-full outline-none bg-transparent" /></td>
                                                <td className="border border-black px-2 py-1 align-top"><input type="text" className="w-full outline-none bg-transparent" /></td>
                                                <td className="border border-black px-2 py-1 align-top"><input type="text" className="w-full outline-none bg-transparent" /></td>
                                                <td className="border border-black px-2 py-1 align-top"><input type="text" className="w-full outline-none bg-transparent" /></td>
                                            </tr>
                                            <tr>
                                                <td className="border border-black px-2 py-1 align-top"><input type="text" className="w-full outline-none bg-transparent" /></td>
                                                <td className="border border-black px-2 py-1 align-top"><input type="text" className="w-full outline-none bg-transparent" /></td>
                                                <td className="border border-black px-2 py-1 align-top"><input type="text" className="w-full outline-none bg-transparent" /></td>
                                                <td className="border border-black px-2 py-1 align-top"><input type="text" className="w-full outline-none bg-transparent" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            {/* Row 15: Remarks */}
                            <tr>
                                <td className="border border-black px-2 py-3 text-center w-8 md:w-12 align-top">15</td>
                                <td className="border border-black px-2 py-3 w-[40%] align-top leading-snug">Remarks/Suggestions, if any</td>
                                <td className="border border-black px-2 py-3 w-[55%] align-top">
                                    <textarea className="w-full min-h-[3rem] outline-none bg-transparent resize-none print:resize-none" rows={3}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer Section */}
                <div className="mt-6 flex flex-col gap-10">
                    <div>
                        Enclosed: Photograph of allotted booth at the event venue.
                    </div>

                    <div className="flex justify-between items-end pb-8">
                        <div className="flex items-center gap-2">
                            Date: <input type="text" className="w-40 border-b border-black outline-none bg-transparent px-1" />
                        </div>
                        <div className="text-right flex flex-col items-center sm:items-end">
                            <input type="text" className="w-64 border-b border-black outline-none bg-transparent mb-1 px-1 text-center sm:text-right" />
                            Signature/Name/Designation of Participant
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ParticipantsFeedback;