import React from 'react';
import { Printer, Download } from 'lucide-react';
import Swal from 'sweetalert2';

const MandateForm = () => {

    const handlePrint = () => {
        document.title = "Mandate_Form";
        window.print();
    };

    const handleDownloadPdf = () => {
        Swal.fire({ title: 'Generating PDF...', text: 'Please wait while your document is being prepared.', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

        const generatePDF = () => {
            const element = document.getElementById('printable-mandate-form');
            
            // Hide buttons briefly during capture
            const actionButtons = element.querySelector('.print\\:hidden');
            if (actionButtons) actionButtons.style.display = 'none';

            // Shrink briefly to fit on one PDF page
            const originalZoom = element.style.zoom;
            element.style.zoom = '0.7';

            const opt = {
                margin:       5,
                filename:     'Mandate_Form.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
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
        <div id="printable-mandate-form" className="min-h-screen bg-gray-100 py-2 print:py-0 print:bg-white text-black font-sans">
            <style>
                {`
                @media print {
                    @page { margin: 5mm; }
                    #printable-mandate-form {
                        zoom: 0.85; 
                    }
                    #printable-mandate-form table {
                        font-size: 13px;
                    }
                    #printable-mandate-form td, #printable-mandate-form th {
                        padding-top: 5px !important;
                        padding-bottom: 5px !important;
                    }
                    #printable-mandate-form textarea {
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
                    <h1 className="text-lg md:text-xl font-bold uppercase mb-2">
                        <span className="border-b-2 border-dashed border-gray-600 pb-1 px-2 uppercase bg-gray-200">MANDATE FORM</span>
                    </h1>
                    <h2 className="text-lg font-bold mb-6">
                        <span className="border-b-2 border-dashed border-gray-600 pb-1 px-2 bg-gray-200">(Account/s Information form)</span>
                    </h2>
                    
                    <p className="text-sm md:text-base font-bold uppercase leading-relaxed max-w-4xl mx-auto pl-2 pr-2">
                        ELECTRONIC CLEARING SERVICE (CREDIT CLEARING) / REAL TIME GROSS SETLEMENT (RTGS) /
                        <br />
                        NATIONAL ELECTRONIC TRANSFER (NEFT) / INTRA BANK ACCOUNT TRANSFER FACILITY FOR
                        <br />
                        RECEIVING PAYMENTS
                    </p>
                </div>

                {/* Table A: Details of Account Holder */}
                <div className="w-full overflow-x-auto print:overflow-visible mb-6">
                    <div className="font-bold mb-1">
                        <span className="bg-gray-200 border-b-2 border-dashed border-gray-600 px-2 pb-0.5">A. DETAILS OF ACCOUNT HOLDER :</span>
                    </div>
                    <table className="w-full border-collapse border border-black text-sm">
                        <tbody>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug">NAME OF ACCOUNT HOLDERER / FIRM</td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <input type="text" className="w-full outline-none bg-transparent" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug">COMPLETE CONTACT ADDRESS</td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <textarea className="w-full min-h-[3rem] outline-none bg-transparent resize-none print:resize-none" rows={2}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug">MOBILE NUMBER / PH NO</td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <input type="text" className="w-full outline-none bg-transparent" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug">E.MAIL</td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <input type="text" className="w-full outline-none bg-transparent" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Table B: Bank Account Details */}
                <div className="w-full overflow-x-auto print:overflow-visible mb-6">
                    <div className="font-bold mb-1">
                        <span className="bg-gray-200 border-b-2 border-dashed border-gray-600 px-2 pb-0.5">B. BANK ACCOUNT DETAILS :</span>
                    </div>
                    <table className="w-full border-collapse border border-black text-sm">
                        <tbody>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug font-bold">
                                    ACCOUNT NAME <br />
                                    <span className="font-normal capitalize text-xs md:text-sm">(Name appearing in your Cheque Book)</span>
                                </td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <input type="text" className="w-full outline-none bg-transparent" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug">
                                    BRANCH NAME WITH COMPLETE ADDRESS, TELEPHONE NO
                                </td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <textarea className="w-full min-h-[4rem] outline-none bg-transparent resize-none print:resize-none" rows={3}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug">
                                    BRANCH CODE
                                </td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <input type="text" className="w-full outline-none bg-transparent" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top font-bold leading-snug">
                                    <span className="uppercase">COMPLETE BANK ACCOUNT NUMBER</span>
                                    <span className="font-semibold block mt-1">(Please note that the Bank Account must be in the name of the Firm as appeared in the bill. In case of other Beneficiaries (Non-vendor) the Account name must be in the name of Applicant.</span>
                                </td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <input type="text" className="w-full min-h-[2rem] outline-none bg-transparent" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug">
                                    IFSC CODE
                                </td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <input type="text" className="w-full outline-none bg-transparent" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug">
                                    TYPE OF ACCOUNT (SB/CURRENT/CASH CREDIT)
                                </td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <input type="text" className="w-full outline-none bg-transparent" />
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top uppercase leading-snug">
                                    MICR CODE OF BANK
                                </td>
                                <td className="border border-black px-3 py-2.5 w-[50%] align-top">
                                    <input type="text" className="w-full outline-none bg-transparent" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Declaration Section */}
                <div className="text-justify text-sm leading-relaxed mb-6">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I hereby declare that the particulars given above are correct and complete. If the transaction is delayed or not effected at all for reasons of incomplete or incorrect information I would not hold the user institution responsible. I have read the option invitation letter and agree to discharge responsibility expected or me as a participant under the scheme.
                </div>

                {/* Signatures Section 1 */}
                <div className="flex justify-end mb-6">
                    <div className="text-center flex flex-col items-center">
                        <div className="flex items-center gap-1">
                            <span>(</span>
                            <input type="text" className="w-64 outline-none bg-transparent border-b border-dotted border-black px-1 text-center" />
                            <span>)</span>
                        </div>
                        <div className="mt-1">Signature of Customer</div>
                    </div>
                </div>

                {/* Bank Verification Section */}
                <div className="mb-6 flex flex-col gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        Date : <input type="text" className="w-40 border-b border-black outline-none bg-transparent px-1" />
                    </div>
                    <div>
                        Certified that the particulars furnished above are correct as per our records.
                    </div>
                </div>

                {/* Signatures Section 2 */}
                <div className="flex justify-between items-end mb-8">
                    <div className="text-sm font-semibold">
                        (Bank's Stamp)
                    </div>
                    <div className="text-center flex flex-col items-center">
                        <div className="flex items-center gap-1">
                            <span>(</span>
                            <input type="text" className="w-64 outline-none bg-transparent border-b border-dotted border-black px-1 text-center" />
                            <span>)</span>
                        </div>
                        <div className="mt-1">Signature of Customer</div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="font-bold text-sm">
                    <div className="mb-3">N.B:</div>
                    <div>Please attach a Cancelled Cheque along with the account information form.</div>
                </div>

            </div>
        </div>
    );
};

export default MandateForm;