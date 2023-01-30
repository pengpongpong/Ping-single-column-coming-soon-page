const mongoose = require("mongoose");

// connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose schema for saving email to DB
const emailSchema = new mongoose.Schema({
  email_comingSoon: String,
  date: Date,
});
const Email = new mongoose.model("Email", emailSchema);

export default function handler(req, res) {
  const { method } = req;

  // process post request
  if (method === "POST") {
    const { email } = req.body;

    // if no email or wrong format then error
    if (!email || !email.includes("@")) {
      res.status(405).json({
        message: "Please provide a valid email address",
      });
    } else {
      // search for email if already registered
      Email.findOne({ email_comingSoon: email }, (err, docs) => {
        // if no registration found then save email to DB
        if (!docs) {
          const newEmail = new Email({
            email_comingSoon: email,
            date: new Date(),
          });

          newEmail.save((err, data) => {
            console.log(data);
            res.json({
              message: "You've been successfully registered",
            });
          });
        } else {
          // email found in DB
          res.json({
            message: "Email already registered",
          });
        }
      });
    }
  }
}
