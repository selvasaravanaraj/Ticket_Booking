import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

await mongoose.connect('mongodb+srv://bravinlc00123:0000@barvin.cnjhott.mongodb.net/lc', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


const naturalMedicineSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const NaturalMedicine = mongoose.model('NaturalMedicine', naturalMedicineSchema);


app.get('/natural-medicines', async (req, res) => {
    try {
        const naturalMedicines = await NaturalMedicine.find();
        // console.log(naturalMedicines)
        res.json(naturalMedicines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
