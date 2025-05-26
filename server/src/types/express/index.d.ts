import { UserType } from '../../models/User'; // Or wherever your User type is defined

// declare global {
//   namespace Express {
//     interface Request {
//       auth?: {
//         userId?: string;
//       };
//       user?: UserType | null;
//     }
//   }
// }

// declare global {
//   namespace Express {
//     interface Request {
//       auth: {
//         userId: string;
//       };
//       user: UserType;
//     }
//   }
// }
