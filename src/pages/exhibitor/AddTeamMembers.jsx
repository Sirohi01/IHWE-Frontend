import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Upload, Trash2, Plus, Save, Calendar, UserCheck, Utensils, Car, Info, AlertCircle, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '@/lib/api';
import { useExhibitorCtx } from '@/context/ExhibitorContext';

const AddTeamMembers = () => {
    const navigate = useNavigate();
    const { data } = useExhibitorCtx();
    const token = localStorage.getItem('exhibitorToken');
    const userId = data?._id;

    const emptyRow = { photo: null, photoPreview: '', name: '', designation: '', mobile: '', email: '', roleAtExhibition: '', idProof: '', idProofDoc: null, idProofDocPreview: '' };
    const [rows, setRows] = useState(Array(3).fill().map(() => ({ ...emptyRow })));
    const [isSaving, setIsSaving] = useState(false);

    const handleAddRow = () => {
        setRows([...rows, { ...emptyRow }]);
    };

    const handleDeleteRow = (index) => {
        if (rows.length === 1) return;
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const handleFieldChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const handlePhotoUpload = async (index, file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('documentType', 'personphoto');

        const toastId = toast.loading('Verifying photo...', { position: 'top-center' });

        try {
            const uploadRes = await fetch(`${API_URL}/exhibitor-auth/team-member-photo`, {
                method: 'POST',
                body: formData,
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await uploadRes.json();

            if (uploadRes.ok) {
                toast.success('Photo verified successfully!', { id: toastId });
                const newRows = [...rows];
                newRows[index].photoPreview = URL.createObjectURL(file);
                newRows[index].photoUrl = data.photoUrl || data.url || data.fileUrl;
                newRows[index].photo = file;
                setRows([...newRows]);
            } else {
                toast.error(`Photo Error: ${data.message || 'Verification failed'}`, { id: toastId });
                // Reset photo
                const newRows = [...rows];
                newRows[index].photoPreview = '';
                newRows[index].photo = null;
                newRows[index].photoUrl = '';
                setRows([...newRows]);

                // Show SweetAlert for detailed error
                if (data.message) {
                    Swal.fire('AI Verification Failed', data.message, 'error');
                }
            }
        } catch (e) {
            console.error(e);
            toast.error('Failed to verify photo. Please try again.', { id: toastId });
        }
    };

    const handleIdProofUpload = async (index, file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('documentType', 'idproof');

        const toastId = toast.loading('Verifying ID Proof...', { position: 'top-center' });

        try {
            const uploadRes = await fetch(`${API_URL}/exhibitor-auth/team-member-photo`, {
                method: 'POST',
                body: formData,
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await uploadRes.json();

            if (uploadRes.ok) {
                toast.success('ID Proof verified successfully!', { id: toastId });
                const newRows = [...rows];
                newRows[index].idProofDocPreview = file.name;
                newRows[index].idProofUrl = data.photoUrl || data.url || data.fileUrl;
                newRows[index].idProofDoc = file;
                setRows([...newRows]);
            } else {
                toast.error(`ID Proof Error: ${data.message || 'Verification failed'}`, { id: toastId });
                // Reset ID Proof
                const newRows = [...rows];
                newRows[index].idProofDocPreview = '';
                newRows[index].idProofDoc = null;
                newRows[index].idProofUrl = '';
                setRows([...newRows]);

                // Show SweetAlert for detailed error
                if (data.message) {
                    Swal.fire('AI Verification Failed', data.message, 'error');
                }
            }
        } catch (e) {
            console.error(e);
            toast.error('Failed to verify ID Proof. Please try again.', { id: toastId });
        }
    };

    const handleSaveAll = async () => {
        const validRows = rows.filter(r => r.name || r.email || r.mobile);

        if (validRows.length === 0) {
            toast.warn('Please fill at least one row');
            return;
        }

        for (let i = 0; i < validRows.length; i++) {
            const r = validRows[i];
            if (!r.name || !r.designation || !r.mobile || !r.email || !r.roleAtExhibition) {
                toast.error(`Please fill all mandatory fields (*) for Row ${i + 1}`);
                return;
            }

            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(r.mobile)) {
                toast.error(`Please enter a valid 10-digit mobile number for Row ${i + 1}`);
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(r.email)) {
                toast.error(`Please enter a valid email address for Row ${i + 1}`);
                return;
            }
        }

        setIsSaving(true);
        try {
            const uploadedMembers = [];
            for (const row of validRows) {
                let photoUrl = row.photoUrl || '';
                let idProofUrl = row.idProofUrl || '';

                uploadedMembers.push({
                    name: row.name,
                    designation: row.designation,
                    mobile: row.mobile,
                    email: row.email,
                    roleAtExhibition: row.roleAtExhibition,
                    idProof: row.idProof,
                    idProofUrl: idProofUrl,
                    photoUrl: photoUrl,
                    passes: {
                        exhibitor: true, vehicle: true, service: true, visitor: false
                    }
                });
            }

            const exRes = await fetch(`${API_URL}/exhibitor-auth/dashboard?id=${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const exData = await exRes.json();

            if (exData && exData.data) {
                const existingTeam = exData.data.teamMembers || [];
                const updatedTeam = [...existingTeam, ...uploadedMembers];

                const updateRes = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ teamMembers: updatedTeam })
                });

                if (updateRes.ok) {
                    toast.success('Team members added successfully!');
                    navigate('/exhibitor-dashboard');
                } else {
                    throw new Error('Failed to update team members in DB');
                }
            } else {
                throw new Error('Could not fetch exhibitor data');
            }

        } catch (error) {
            console.error('Error saving members:', error);
            toast.error('An error occurred while saving team members.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] p-4  font-sans">
            <div className=" space-y-4 ">

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
                            <UserCheck className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-[15px] font-medium text-slate-800 leading-tight">Add Team Members</h1>
                            <p className="text-[12px] text-slate-500">Add multiple team members who will be involved in the exhibition.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="h-8 px-3 rounded-md border border-slate-300 bg-white text-slate-700 font-semibold text-[13px] flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                            <Upload size={14} />
                            Import
                        </button>
                        <button className="h-8 px-3 rounded-md border border-slate-300 bg-white text-slate-700 font-semibold text-[13px] flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
                            <Download size={14} />
                            Template
                        </button>
                        <button onClick={handleSaveAll} disabled={isSaving} className="h-8 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-[13px] flex items-center gap-2 shadow-sm shadow-blue-200 transition-colors disabled:opacity-70">
                            <Save size={14} />
                            {isSaving ? 'Saving...' : 'Save All'}
                        </button>
                    </div>
                </div>



                <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 flex items-center gap-2 text-blue-800 shadow-sm">
                    <Info size={16} className="text-blue-500 flex-shrink-0" />
                    <p className="text-[13px] font-medium leading-tight">Add as many team members as required. Use 'Add Row' to insert more members.</p>
                </div>

                <div className="bg-white rounded-xl mr-8 border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-max xl:min-w-0">
                            <thead>
                                <tr className="border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-50">
                                    <th className="px-2 py-3 w-10 text-center">#</th>
                                    <th className="px-2 py-3 w-16 text-center">Photo</th>
                                    <th className="px-2 py-3 min-w-[120px] w-auto">Full Name <span className="text-red-500">*</span></th>
                                    <th className="px-2 py-3 min-w-[130px] w-auto">Designation <span className="text-red-500">*</span></th>
                                    <th className="px-2 py-3 min-w-[130px] w-auto">Mobile <span className="text-red-500">*</span></th>
                                    <th className="px-2 py-3 min-w-[130px] w-auto">Email ID <span className="text-red-500">*</span></th>
                                    <th className="px-2 py-3 min-w-[130px] w-auto">Role <span className="text-red-500">*</span></th>
                                    <th className="px-2 py-3 min-w-[120px] w-auto">ID Proof</th>
                                    <th className="px-2 py-3 w-10 text-center"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {rows.map((row, index) => (
                                    <tr key={index} className="hover:bg-slate-50/60 transition-colors border-b border-slate-100 last:border-none">
                                        <td className="px-2 py-3 text-center">
                                            <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs mx-auto">
                                                {index + 1}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <label className="w-10 h-10 rounded-lg border border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden group mx-auto relative">
                                                <input type="file" accept="image/jpeg, image/png" className="hidden" onChange={(e) => handlePhotoUpload(index, e.target.files[0])} />
                                                {row.photoPreview ? (
                                                    <img loading="lazy" decoding="async" src={row.photoPreview} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Upload size={14} className="text-blue-500 group-hover:scale-110 transition-transform" />
                                                )}
                                            </label>
                                        </td>
                                        <td className="px-2 py-3">
                                            <input type="text" value={row.name} onChange={(e) => handleFieldChange(index, 'name', e.target.value)} placeholder="Full Name" className="w-full h-9 px-2 rounded-md border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs font-medium text-slate-800" />
                                        </td>
                                        <td className="px-2 py-3">
                                            <select value={row.designation} onChange={(e) => handleFieldChange(index, 'designation', e.target.value)} className="w-full h-9 px-1 rounded-md border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs font-medium text-slate-800 bg-white">
                                                <option value="">Select</option>
                                                <option value="Sales Manager">Sales Manager</option>
                                                <option value="Marketing Executive">Marketing Exec.</option>
                                                <option value="Sales Executive">Sales Executive</option>
                                                <option value="Stall Incharge">Stall Incharge</option>
                                                <option value="Technical Executive">Tech Executive</option>
                                                <option value="CEO">CEO</option>
                                                <option value="CTO">CTO</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="flex h-9 rounded-md border border-slate-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                                                <div className="bg-slate-50 px-2 flex items-center justify-center border-r border-slate-300 text-slate-500 text-[10px] font-semibold">
                                                    +91
                                                </div>
                                                <input type="tel" maxLength="10" value={row.mobile} onChange={(e) => handleFieldChange(index, 'mobile', e.target.value.replace(/\D/g, ''))} placeholder="Mobile" className="w-full h-full px-2 outline-none text-xs font-medium text-slate-800" />
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <input type="email" value={row.email} onChange={(e) => handleFieldChange(index, 'email', e.target.value)} placeholder="Email" className="w-full h-9 px-2 rounded-md border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs font-medium text-slate-800" />
                                        </td>
                                        <td className="px-2 py-3">
                                            <select value={row.roleAtExhibition} onChange={(e) => handleFieldChange(index, 'roleAtExhibition', e.target.value)} className="w-full h-9 px-1 rounded-md border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs font-medium text-slate-800 bg-white">
                                                <option value="">Select</option>
                                                <option value="Primary Contact">Primary Contact</option>
                                                <option value="Marketing Team">Marketing Team</option>
                                                <option value="Sales Team">Sales Team</option>
                                                <option value="Stall Incharge">Stall Incharge</option>
                                                <option value="Technical Team">Tech Team</option>
                                            </select>
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="flex flex-col gap-1">
                                                <select value={row.idProof} onChange={(e) => handleFieldChange(index, 'idProof', e.target.value)} className="w-full h-9 px-1 rounded-md border border-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs font-medium text-slate-800 bg-white">
                                                    <option value="">Select ID</option>
                                                    <option value="Aadhaar Card">Aadhaar Card</option>
                                                    <option value="PAN Card">PAN Card</option>
                                                    <option value="Driving Licence">Driving Licence</option>
                                                    <option value="Passport">Passport</option>
                                                </select>
                                                {row.idProof && (
                                                    <label className="flex items-center gap-1 cursor-pointer bg-slate-50 border border-slate-300 hover:bg-slate-100 rounded-md px-2 py-1.5 h-9 text-[11px] font-medium text-slate-700 transition-colors w-full justify-between">
                                                        <span className="truncate max-w-[60px]">{row.idProofDoc ? 'Uploaded' : 'Upload'}</span>
                                                        <Upload size={12} className={row.idProofDoc ? 'text-green-500' : 'text-blue-500'} />
                                                        <input type="file" accept="image/jpeg, image/png, application/pdf" className="hidden" onChange={(e) => handleIdProofUpload(index, e.target.files[0])} />
                                                    </label>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            <button onClick={() => handleDeleteRow(index)} className="w-7 h-7 rounded-md border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors mx-auto disabled:opacity-30 disabled:hover:bg-transparent" disabled={rows.length === 1} title="Delete Row">
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                        <div className="flex gap-2">
                            <button onClick={handleAddRow} className="h-8 px-3 rounded-md border border-blue-300 text-blue-700 bg-white font-semibold text-[13px] flex items-center gap-1.5 hover:bg-blue-50 transition-colors shadow-sm">
                                <Plus size={14} />
                                Add Row
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-semibold text-slate-600">Total Members:</span>
                            <div className="h-6 px-2.5 rounded bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[13px]">
                                {rows.filter(r => r.name || r.email || r.mobile).length}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-3 flex gap-3 overflow-hidden relative shadow-sm">
                    <div className="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center flex-shrink-0 z-10">
                        <AlertCircle className="text-amber-600" size={16} />
                    </div>
                    <div className="z-10">
                        <h3 className="text-[13px] font-bold text-amber-900 mb-0.5">Please Note</h3>
                        <ul className="list-disc pl-4 text-[12px] text-amber-800 space-y-0.5 font-medium">
                            <li>Fields marked with <span className="text-red-500 font-bold">*</span> are mandatory.</li>
                            <li>Ensure details are accurate for smooth verification.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddTeamMembers;
