// Create Mongoose schema
import mongoose, { Model, Schema } from 'mongoose';

import { TokenBalance, TokenNft, TokenNftContentValueImage, TokenNftToken } from '../../airstack/nfts/interfaces';
import { EnrichedUserProfile } from '../../profile/interfaces';

// Define Mongoose schema for TokenNftToken
const TokenNftTokenSchema = new Schema<TokenNftToken>({
  name: String,
  projectDetails: {
    collectionName: String,
    externalUrl: String,
    twitterUrl: String,
    imageUrl: String,
  },
});

// Define Mongoose schema for TokenNftContentValueImage
const TokenNftContentValueImageSchema = new Schema<TokenNftContentValueImage>({
  medium: String,
});

// Define Mongoose schema for TokenNft
const TokenNftSchema = new Schema<TokenNft>({
  address: String,
  type: String,
  token: TokenNftTokenSchema,
  contentValue: {
    image: TokenNftContentValueImageSchema,
  },
});

// Define Mongoose schema for TokenBalance
const TokenBalanceSchema = new Schema<TokenBalance>({
  tokenAddress: String,
  tokenNfts: [TokenNftSchema],
});

const EnrichedUserProfileSchema = new Schema<EnrichedUserProfile>(
  {
    body: {
      id: Number,
      address: String,
      username: String,
      displayName: String,
      bio: String,
      followers: Number,
      following: Number,
      avatarUrl: String,
      isVerifiedAvatar: Boolean,
      registeredAt: Number,
    },
    connectedAddress: String,
    connectedAddresses: [String],
    nfts: {
      ethereum: [TokenBalanceSchema],
      polygon: [TokenBalanceSchema],
    },
    poaps: [
      {
        eventId: String,
        poapEvent: {
          eventName: String,
          eventURL: String,
          startDate: String,
          endDate: String,
          country: String,
          city: String,
          contentValue: {
            image: {
              extraSmall: String,
              large: String,
              medium: String,
              original: String,
            },
          },
        },
      },
    ],
    tokenTransfers: [String],
  },
  {
    collection: 'users',
  }
);

type EnrichedUserProfileModel = Model<EnrichedUserProfile & Document>;

const EnrichedUserProfileModel = mongoose.model<EnrichedUserProfile, EnrichedUserProfileModel>(
  'EnrichedUserProfile',
  EnrichedUserProfileSchema
);

export default EnrichedUserProfileModel;
