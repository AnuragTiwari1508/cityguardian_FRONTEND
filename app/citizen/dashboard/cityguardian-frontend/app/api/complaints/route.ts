import dbConnect from '@/lib/mongodb';
import Complaint from '@/models/complaint';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const complaint = new Complaint(req.body);
      await complaint.save();
      return res.status(201).json(complaint);
    } catch (error) {
      return res.status(400).json({ error: 'Error creating complaint' });
    }
  }

  if (req.method === 'GET') {
    try {
      const complaints = await Complaint.find();
      return res.status(200).json(complaints);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching complaints' });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}