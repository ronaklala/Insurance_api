const express = require("express");
const Agent = require("../Models/InsuranceAgentSchema");
const contactAgent = require("../Models/ContactAgentSchema");
const Payment = require("../Models/PaymentModel");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51JGN72SBUj7Zk1FJw3eNZPtEhgK7VeDuUAu1rQPlrw1dW8qfFFaTxfUesKFfRRpC0ZTob0aDgzx4FEAk8DPldocF00lzYh1dQB"
);
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:5000";

router.post("/agent/agent_register", (req, res) => {
  const check = Agent.find({ email: req.body.email }).then((doc) => {
    if (doc.length === 0) {
      const agent = new Agent(req.body);

      agent
        .save()
        .then((doc) => {
          res.status(200).json({ message: "Added" });
        })
        .catch((err) => {
          res.status(400).json({ message: "Internal Server Error" });
        });
    } else {
      res.status(403).json({ message: "Already Exist" });
    }
  });
});

router.get("/agent/get_agents_data_no_verification", (req, res) => {
  const agents = Agent.find({ is_verified: 0 })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/agent/get_single_agent/:id", (req, res) => {
  const id = req.params.id;

  const agent = Agent.findById(id).then((doc) => {
    res.json(doc);
  });
});

router.post("/admin/agent_login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  const agent = Agent.find({ email: email }).then((doc) => {
    if (doc.length != 0) {
      if (doc[0].password === pass) {
        res.json(doc);
      } else {
        res.status(400).json({ mesage: "Passwords not match" });
      }
    } else {
      res.status(404).json({ message: "No EMailFound" });
    }
  });
});

router.get(
  "/agent/get_clients/:type/:category/:city",
  (req, res) => {
    let doc = [];
    const posts = contactAgent
      .aggregate([
        {
          $match: {
            result: { $lte: 0 },
            type: req.params.type,
            Category: req.params.category,
            City: req.params.city,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "uid",
            foreignField: "_id",
            as: "user_details",
          },
        },
      ])
      .then((data) => {
        res.json(data);
      });
  },
  []
);

router.post("/agent/StartWork/:id/:agent", (req, res) => {
  contactAgent
    .findByIdAndUpdate(req.params.id, { result: 1, aid: req.params.agent })
    .then((doc) => {
      res.status(200).json({ message: "Done" });
    });
});

router.post("/update/agent/", (req, res) => {
  /* Updating the profile image of the agent. */
  Agent.findByIdAndUpdate(req.body.agent_id, {
    profile_img: req.body.image,
  }).then((doc) => {
    res.json({ message: "Done" });
  });
});

router.post("/create-checkout-session/:pid/:plan/:aid", async (req, res) => {
  const session = await stripe.checkout.sessions
    .create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: req.params.pid,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        `${YOUR_DOMAIN}/success_payment/` +
        req.params.plan +
        "/" +
        req.params.aid +
        "/bdc1e778af50d37a791b04decdff766c806ed59c40bc240ef12eaf15a36ce8a75572505f26fa588ad4c9602304b58fce9/" +
        stripe.checkout.sessions.id,
      cancel_url: `${YOUR_DOMAIN}/canceled`,
    })
    .then((doc) => {
      res.redirect(303, doc.url);
    });
});

router.get("/success_payment/:plan/:aid/:rand", (req, res) => {
  if (req.params.plan === "standard") {
    Agent.findByIdAndUpdate(req.params.aid, { $inc: { credit: 20 } }).then(
      (doc) => {
        const payment = new Payment();
        payment.aid = req.params.aid;
        payment.plan = req.params.plan;

        payment.save().then((doc) => {
          res.redirect("http://localhost:3001/Payment-Success");
        });
      }
    );
  } else if (req.params.plan === "Gold") {
    Agent.findByIdAndUpdate(req.params.aid, { $inc: { credit: 50 } }).then(
      (doc) => {
        const payment = new Payment();
        payment.aid = req.params.aid;
        payment.plan = req.params.plan;

        payment.save().then((doc) => {
          res.redirect("http://localhost:3001/Payment-Success");
        });
      }
    );
  } else if (req.params.plan === "Platinum") {
    Agent.findByIdAndUpdate(req.params.aid, { $inc: { credit: 100 } }).then(
      (doc) => {
        const payment = new Payment();
        payment.aid = req.params.aid;
        payment.plan = req.params.plan;

        payment.save().then((doc) => {
          res.redirect("http://localhost:3001/Payment-Success");
        });
      }
    );
  }
});

router.get("/agent/get_txn/:id", (req, res) => {
  Payment.find({ aid: req.params.id }).then((doc) => {
    res.json(doc);
  });
});

module.exports = router;
