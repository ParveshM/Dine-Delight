import mongoose from "mongoose";
import slugify from "slugify";
const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seller"],
      default: "seller",
    },
    address: String,
    description: String,
    tableRatePerPerson: {
      type: Number,
      default: 200,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    openingTime: String,
    closingTime: String,
    isListed: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    primaryImage: String,

    secondaryImages: [
      {
        type: String,
      },
    ],
    verificationToken: String,
  },
  { timestamps: true }
);
// pre save function for inserting slug field
restaurantSchema.pre("save", function (next) {
  if (!this.isModified("restaurantName")) {
    return next();
  }

  this.slug = slugify(this.restaurantName, { lower: true });
  next();
});

restaurantSchema.pre("findOneAndUpdate", async function (next) {
  const conditions = this.getQuery();
  const document = await this.model.findOne(conditions);
  if (document) {
    console.log(document);
    document.slug = slugify(document.restaurantName, { lower: true });
    await document.save();
  }
  next();
});

restaurantSchema.index({ location: "2dsphere" }); // indexing for the location

export default mongoose.model("Restaurant", restaurantSchema);
