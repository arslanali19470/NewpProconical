// types.ts
export interface TopicDetail {
  id: string;
  title: string;

  userId: string;
  trash: boolean;
  Arguments: {
    Pros: string[];
    Cons: string[];
  };
  DateandTime: string;
}
// interface Goal {
//   id: string;
//   title: string;
//   userId: string;
//   trash: boolean;
//   DateandTime: Date;
//   Arguments: {
//     Pros: ProCon[];
//     Cons: ProCon[];
//   };
// }

// export interface Argument {
//   type: 'Cons' | 'Pros';
//   description: string;
//   importance: number;
// }

export interface ProsConsType {
  id: string;
  description: string;
  importance: number;
  subid: string;
  type: 'Cons' | 'Pros';
}
