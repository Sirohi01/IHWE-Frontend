import React from 'react';
import { Printer, Download } from 'lucide-react';
import Swal from 'sweetalert2';

const AnnexureD = () => {
    const handlePrint = () => {
        document.title = "Annexure_D_Claim_Form";
        window.print();
    };

    const handleDownloadPdf = () => {
        Swal.fire({
            title: "Download PDF",
            text: "Please change the 'Destination' to 'Save as PDF' in the print dialog to download.",
            icon: "info",
            confirmButtonText: "Okay",
            confirmButtonColor: "#2563eb",
        }).then(() => {
            document.title = "Annexure_D_Claim_Form";
            window.print();
        });
    };

    return (
        <div id="printable-annexure-d" className="min-h-screen bg-gray-100 py-2 print:py-0 print:bg-white text-black font-serif">
            <style>
                {`
                @media print {
                    @page { margin: 5mm; }
                    #printable-annexure-d {
                        zoom: 0.85; 
                    }
                    #printable-annexure-d table {
                        font-size: 12px;
                    }
                    #printable-annexure-d td, #printable-annexure-d th {
                        padding-top: 4px !important;
                        padding-bottom: 4px !important;
                    }
                    #printable-annexure-d textarea {
                        min-height: 0 !important;
                        height: auto !important;
                    }
                }
                `}
            </style>
            <div className="mx-auto bg-white p-6 print:p-0 shadow-xl print:shadow-none">
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mb-4 print:hidden">
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

                {/* Form Header */}
                <div className="text-center mb-4 font-bold print:mb-2">
                    <h1 className="text-lg underline underline-offset-4">ANNEXURE - D</h1>
                    <h2 className="text-lg underline underline-offset-4 mt-2 print:mt-1">CLAIM FORM</h2>
                    <h3 className="text-base font-bold underline underline-offset-4 mt-2 print:mt-1">
                        (To be filled by beneficiary unit for claiming reimbursement)
                    </h3>
                </div>

                {/* Main Content Table (Part I & II) */}
                <table className="w-full border-collapse border border-black text-sm">
                    <tbody>
                        {/* PART - I */}
                        <tr>
                            <td colSpan={3} className="border border-black px-3 py-1.5 font-bold bg-gray-50 print:bg-transparent">
                                PART - I : Entrepreneurs' Details :
                            </td>
                        </tr>
                        <tr >
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">1.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">Name of Implementing agency</td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top" >
                                <input type="text" className="w-full outline-none bg-transparent" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">2.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">Name of the Applicant Unit</td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top">
                                <input type="text" className="w-full min-h-[2rem] outline-none bg-transparent" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">3.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">Complete address, phone, Fax, e-mail including name of the proprietor/partner</td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top">
                                <textarea className="w-full min-h-[2rem] outline-none bg-transparent resize-none print:resize-none" rows={4}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">4.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">Udyam Registration Number (Pl. enclose copy)</td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top">
                                <input type="text" className="w-full min-h-[2rem] outline-none bg-transparent" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">5.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">Category of the entrepreneur (General/Women/SC/ST /NER/PH) (Pl. enclose the copy of relevant document, as applicable)</td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top">
                                <input type="text" className="w-full min-h-[2rem] outline-none bg-transparent" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">6.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">Type of the unit (Micro or Small) (whichever applicable)</td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top">
                                <input type="text" className="w-full min-h-[2rem] outline-none bg-transparent" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">7.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">Category of the Unit (Manufacturing/Service)</td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top">
                                <input type="text" className="w-full min-h-[2rem] outline-none bg-transparent" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">8.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">Products manufactured/service rendered by applicant unit</td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top">
                                <textarea className="w-full min-h-[2rem] outline-none bg-transparent resize-none print:resize-none" rows={4}></textarea>
                            </td>
                        </tr>

                        {/* PART - II */}
                        <tr>
                            <td colSpan={3} className="border border-black px-3 py-1.5 font-bold bg-gray-50 print:bg-transparent">
                                PART-II: Event details
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">9.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">Name of event participated, venue, duration of trade fair / exhibition</td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top">
                                <textarea className="w-full min-h-[7rem] outline-none bg-transparent resize-none print:resize-none" rows={5}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 text-center w-12 align-top">10.</td>
                            <td className="border border-black px-3 py-2 w-[35%] align-top leading-snug">
                                <span className="font-semibold mb-2 block print:mb-0">Feedback: [about 200 words]</span>
                                Include details about new business tie-ups achieved through the event. B2B Knowledge on new technology, opportunity for market expansion etc.
                            </td>
                            <td className="border border-black px-3 py-2 w-[65%] align-top">
                                <textarea className="w-full min-h-[4rem] outline-none bg-transparent resize-none print:resize-none" rows={5}></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Table for PART III */}
                <table className="w-full border-collapse border border-black border-t-0 text-sm">
                    <thead>
                        <tr>
                            <td colSpan={4} className="border-x border-black border-b border-t-0 px-3 py-1.5 font-bold bg-gray-50 print:bg-transparent">
                                PART -III : Payment Details
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="border border-black px-3 py-1.5 font-bold text-center">
                                DETAILS OF CLAIM (in Rs.)
                            </td>
                        </tr>
                        <tr className="text-center font-bold bg-gray-50 print:bg-transparent">
                            <th className="border border-black px-2 py-1.5 w-[20%] align-middle print:w-[22%]">Name of<br />Scheme<br />component</th>
                            <th className="border border-black px-2 py-1.5 w-[40%] align-middle print:w-[38%]">Items</th>
                            <th className="border border-black px-2 py-1.5 w-[20%] align-middle print:w-[20%]">Actual<br />Expenditure<br />(in Rs.)</th>
                            <th className="border border-black px-2 py-1.5 w-[20%] align-middle print:w-[20%]">Amount<br />Admissible<br />as per<br />Scheme<br />guidelines<br />(in Rs.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black px-3 py-2 font-bold align-top" rowSpan={2}>
                                Domestic<br />Trade Fairs<br />/<br />Exhibitions
                            </td>
                            <td className="border border-black px-3 py-2 align-top leading-snug">
                                Contingency expenditure including travel, (attach expenditure copy for travel/publicity/ freight charges)
                            </td>
                            <td className="border border-black px-3 py-2 align-top">
                                <input type="number" className="w-full outline-none bg-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="" />
                            </td>
                            <td className="border border-black px-3 py-2 align-top">
                                <input type="number" className="w-full outline-none bg-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-black px-3 py-2 align-top leading-snug">
                                Space Rent (stall rent)(Minimum booth/stall size provided by fair organiser)(Attach invoice / bill)
                            </td>
                            <td className="border border-black px-3 py-2 align-top">
                                <input type="number" className="w-full outline-none bg-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="" />
                            </td>
                            <td className="border border-black px-3 py-2 align-top">
                                <input type="number" className="w-full outline-none bg-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="border border-black px-3 py-2 font-bold text-center">
                                Total (in Rs.)
                            </td>
                            <td className="border border-black px-3 py-2 align-top">
                                <input type="number" className="w-full font-bold outline-none bg-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="" />
                            </td>
                            <td className="border border-black px-3 py-2 align-top">
                                <input type="number" className="w-full font-bold outline-none bg-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnnexureD;