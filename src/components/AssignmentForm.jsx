'use client';

import { useState } from 'react';

export default function AssignmentForm({ teachers = [], student }) {
  const [form, setForm] = useState({
    rollNo: student?.rollNo || '',
    name: student?.name || '',
    className: student?.className || '',
    section: student?.section || '',
    description: '',
    teacherId: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const res = await fetch('/api/student/submit', { method: 'POST', body: formData });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4 max-w-3xl">
      <h2 className="text-2xl font-bold">Submit Assignment</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Roll Number" className="border rounded-lg px-4 py-3" />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Student Name" className="border rounded-lg px-4 py-3" />
        <input name="className" value={form.className} onChange={handleChange} placeholder="Class" className="border rounded-lg px-4 py-3" />
        <input name="section" value={form.section} onChange={handleChange} placeholder="Section" className="border rounded-lg px-4 py-3" />
      </div>
      <select name="teacherId" value={form.teacherId} onChange={handleChange} className="border rounded-lg px-4 py-3 w-full">
        <option value="">Select Teacher</option>
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>{teacher.user.name}</option>
        ))}
      </select>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Assignment Description" className="border rounded-lg px-4 py-3 w-full h-36" />
      <input type="file" name="file" onChange={handleChange} className="border rounded-lg px-4 py-3 w-full" />
      <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">Submit</button>
    </form>
  );
}