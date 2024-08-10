import {
  getFirestore,
  getDocs,
  addDoc,
  query,
  where,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert, ToastAndroid} from 'react-native';
import {ProsConsType} from '../TypeExport/TypeExport';

interface ProCon {
  impt: number;
  Description: string;
}

interface Goal {
  id: string;
  title: string;
  userId: string;
  trash: boolean;
  DateandTime: Date;
  Arguments: {
    Pros: ProCon[];
    Cons: ProCon[];
  };
}

export const signInAnonymously = async (): Promise<string | null> => {
  try {
    const userCredential = await auth().signInAnonymously();
    const userId = userCredential.user?.uid ?? null;
    console.log('Signed in with user ID:', userId);
    return userId;
  } catch (error) {
    console.error('Error signing in anonymously:', error);
    ToastAndroid.show('Error signing in anonymously', ToastAndroid.SHORT);
    return null;
  }
};

// export const getGoalByUser = (
//   userId: string,
//   setGoals: (goals: Goal[]) => void,
//   setLoading: (loading: boolean) => void,
// ): (() => void) => {
//   setLoading(true);
//   const firestore = getFirestore();
//   const docRef = collection(firestore, 'Goals');
//   const q = query(
//     docRef,
//     where('userId', '==', userId),
//     where('trash', '==', false),
//   );

//   const unsubscribe = onSnapshot(
//     q,
//     querySnapshot => {
//       const goals: Goal[] = [];
//       querySnapshot.forEach(doc => {
//         goals.push(doc.data() as Goal);
//       });

//       setGoals(goals);
//       setLoading(false);
//     },
//     error => {
//       console.error('Error getting goal: ', error);
//       setLoading(false);
//     },
//   );

//   return unsubscribe;
// };

export const getGoalByUser = (
  userId: string,
  setGoals: (goals: Goal[]) => void,
  setLoading: (loading: boolean) => void,
): (() => void) => {
  // Validate userId
  if (!userId) {
    console.error('Error: userId is undefined or null');
    setLoading(false);
    return () => {}; // Return an empty function if userId is invalid
  }

  setLoading(true);
  const firestore = getFirestore();
  const docRef = collection(firestore, 'Goals');
  const q = query(
    docRef,
    where('userId', '==', userId),
    where('trash', '==', false),
  );

  const unsubscribe = onSnapshot(
    q,
    querySnapshot => {
      const goals: Goal[] = [];
      querySnapshot.forEach(doc => {
        goals.push(doc.data() as Goal);
      });

      if (goals.length === 0) {
        console.log('No goals found. Kindly add some goals.');
        // Optionally, set a specific message or state in your UI to handle this case
      }

      setGoals(goals);
      setLoading(false);
    },
    error => {
      console.error('Error getting goal: ', error);
      setLoading(false);
    },
  );

  return unsubscribe;
};

export const getTrash = (
  userId: string,
  setTrash: (goals: Goal[]) => void,
  setLoading: (loading: boolean) => void,
): (() => void) => {
  setLoading(true);
  const firestore = getFirestore();
  const docRef = collection(firestore, 'Goals');
  const q = query(
    docRef,
    where('userId', '==', userId),
    where('trash', '==', true),
  );

  const unsubscribe = onSnapshot(
    q,
    querySnapshot => {
      const Trash: Goal[] = [];
      querySnapshot.forEach(doc => {
        Trash.push(doc.data() as Goal);
      });

      setTrash(Trash);
      setLoading(false);
    },
    error => {
      console.error('Error getting goal: ', error);
      setLoading(false);
    },
  );

  return unsubscribe;
};

// export const createGoal = async (goalData: Goal): Promise<string | unknown> => {
//   try {
//     const firestore = getFirestore();

//     const goalsCollection = collection(firestore, 'Goals');
//     const docRef = await addDoc(goalsCollection, goalData);
//     return docRef.id;
//   } catch (error) {
//     console.error('Error adding goal: ', error);
//     ToastAndroid.show('Error adding goal', ToastAndroid.SHORT);
//     return error;
//   }
// };

export const createOrUpdateGoal = async (
  goalData: Goal,
): Promise<string | unknown> => {
  try {
    const firestore = getFirestore();
    const goalsCollection = collection(firestore, 'Goals');

    // Check if the goal with the given id already exists
    const q = query(goalsCollection, where('id', '==', goalData.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If the goal exists, update the title
      const docRef = querySnapshot.docs[0].ref; // Get the first matching document
      await updateDoc(docRef, {title: goalData.title});
      return docRef.id;
    } else {
      // If the goal does not exist, create a new one
      const docRef = await addDoc(goalsCollection, goalData);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error adding or updating goal: ', error);
    ToastAndroid.show('Error adding or updating goal', ToastAndroid.SHORT);
    return error;
  }
};

// export const addProsConsItem = async (
//   selectedItem: ProsConsType | undefined,
//   selectedId: string | undefined,
//   newItem: ProsConsType,
//   navigation: any,
// ) => {
//   if (!selectedItem || !selectedId) {
//     Alert.alert('Error', 'Please fill all required fields');
//     return;
//   }

//   try {
//     const firestore = getFirestore();
//     const docRef = collection(firestore, 'Goals');
//     const q = query(docRef, where('id', '==', selectedItem.id));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//       Alert.alert('Error', 'Goal document with matching id does not exist');
//       return;
//     }

//     querySnapshot.forEach(async doc => {
//       const data = doc.data();
//       const updatedArguments = {Pros: [], Cons: [], ...data.Arguments};

//       if (selectedId === '1') {
//         updatedArguments.Pros.push(newItem);
//       } else {
//         updatedArguments.Cons.push(newItem);
//       }

//       await doc.ref.update({Arguments: updatedArguments});
//     });

//     Alert.alert('Success', 'Item added successfully');
//     navigation.goBack();
//   } catch (error) {
//     console.error('Error adding item: ', error);
//     Alert.alert('Error', 'Error adding item');
//   }
// };

export const updateTrashStatus = async (id: string, newStatus: boolean) => {
  try {
    const firestore = getFirestore();
    const docRef = collection(firestore, 'Goals');
    const q = query(docRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('No matching documents.');
      return;
    }

    querySnapshot.forEach(async doc => {
      const currentTrashStatus = doc.data().trash;

      if (currentTrashStatus === true && newStatus === true) {
        await deleteDoc(doc.ref);
        console.log(`Goal ${id} deleted from the collection.`);
      } else {
        await updateDoc(doc.ref, {trash: newStatus});
        console.log(`Goal ${id} trash status updated to ${newStatus}`);
      }
    });
  } catch (error) {
    console.error('Error updating trash status: ', error);
  }
};

export const addProsConsItem = async (
  selectedItem: ProsConsType | undefined,
  selectedId: string | undefined,
  newItem: ProsConsType,
  navigation: any,
) => {
  if (!selectedItem || !selectedId) {
    Alert.alert('Error', 'Please fill all required fields');
    return;
  }

  try {
    const firestore = getFirestore();
    const docRef = collection(firestore, 'Goals');
    const q = query(docRef, where('id', '==', selectedItem.id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      Alert.alert('Error', 'Goal document with matching id does not exist');
      return;
    }

    querySnapshot.forEach(async doc => {
      const data = doc.data();
      const updatedArguments = {Pros: [], Cons: [], ...data.Arguments};

      if (selectedId === '1') {
        updatedArguments.Pros.push(newItem);
      } else {
        updatedArguments.Cons.push(newItem);
      }

      await doc.ref.update({Arguments: updatedArguments});
    });

    ToastAndroid.show('Item added successfully', ToastAndroid.SHORT);
    navigation.goBack();
  } catch (error) {
    console.error('Error adding item: ', error);
    Alert.alert('Error', 'Error adding item');
  }
};

export const updateProsConsItem = async (
  selectedItem: ProsConsType | undefined,
  selectedId: string | undefined,
  updatedItem: ProsConsType,
  navigation: any,
) => {
  if (!selectedItem || !selectedId) {
    Alert.alert('Error', 'Please fill all required fields');
    return;
  }

  try {
    const firestore = getFirestore();
    const docRef = collection(firestore, 'Goals');
    const q = query(docRef, where('id', '==', selectedItem.id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      Alert.alert('Error', 'Goal document with matching id does not exist');
      return;
    }

    querySnapshot.forEach(async doc => {
      const data = doc.data();
      const updatedArguments = {Pros: [], Cons: [], ...data.Arguments};

      if (selectedItem.type === 'Pros' && selectedId === '2') {
        // Move from Pros to Cons
        updatedArguments.Pros = updatedArguments.Pros.filter(
          (item: ProsConsType) => item.subid !== updatedItem.subid,
        );
        updatedItem.type = 'Cons'; // Update the type to Cons
        updatedArguments.Cons.push(updatedItem);
      } else if (selectedItem.type === 'Cons' && selectedId === '1') {
        // Move from Cons to Pros
        updatedArguments.Cons = updatedArguments.Cons.filter(
          (item: ProsConsType) => item.subid !== updatedItem.subid,
        );
        updatedItem.type = 'Pros'; // Update the type to Pros
        updatedArguments.Pros.push(updatedItem);
      } else {
        // If the type hasn't changed, just update the existing item in place
        if (selectedId === '1') {
          const index = updatedArguments.Pros.findIndex(
            (item: ProsConsType) => item.subid === updatedItem.subid,
          );
          if (index !== -1) {
            updatedItem.type = 'Pros'; // Ensure type is consistent
            updatedArguments.Pros[index] = updatedItem;
          }
        } else {
          const index = updatedArguments.Cons.findIndex(
            (item: ProsConsType) => item.subid === updatedItem.subid,
          );
          if (index !== -1) {
            updatedItem.type = 'Cons'; // Ensure type is consistent
            updatedArguments.Cons[index] = updatedItem;
          }
        }
      }

      await doc.ref.update({Arguments: updatedArguments});
    });

    Alert.alert('Success', 'Item updated successfully');
    navigation.goBack();
  } catch (error) {
    console.error('Error updating item: ', error);
    Alert.alert('Error', 'Error updating item');
  }
};

// ===============================
export const fetchProsRealtime = (
  GoalId: string,
  setPros: (pros: ProCon[]) => void,
  setLoading: (loading: boolean) => void,
): (() => void) => {
  setLoading(true);
  const firestore = getFirestore();
  const docRef = collection(firestore, 'Goals');
  const q = query(docRef, where('id', '==', GoalId)); // Changed 'userId' to 'id'

  const unsubscribe = onSnapshot(
    q,
    querySnapshot => {
      const pros: ProCon[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data() as Goal;
        pros.push(...data.Arguments.Pros); // Map the items in Pros array
      });

      setPros(pros);
      setLoading(false);
    },
    error => {
      console.error('Error getting goal: ', error);
      setLoading(false);
    },
  );

  return unsubscribe;
};

export const fetchConsRealtime = (
  GoalId: string,
  setCons: (cons: ProCon[]) => void,
  setLoading: (loading: boolean) => void,
): (() => void) => {
  setLoading(true);
  const firestore = getFirestore();
  const docRef = collection(firestore, 'Goals');
  const q = query(docRef, where('id', '==', GoalId));

  const unsubscribe = onSnapshot(
    q,
    querySnapshot => {
      const cons: ProCon[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data() as Goal;
        cons.push(...data.Arguments.Cons); // Map the items in Cons array
      });

      setCons(cons);
      setLoading(false);
    },
    error => {
      console.error('Error getting goal: ', error);
      setLoading(false);
    },
  );

  return unsubscribe;
};
export const fetchTitleRealtime = (
  GoalId: string,
  setTitle: (title: string) => void,
  // setLoading: (loading: boolean) => void,
): (() => void) => {
  // setLoading(true);
  const firestore = getFirestore();
  const docRef = collection(firestore, 'Goals');
  const q = query(docRef, where('id', '==', GoalId));

  const unsubscribe = onSnapshot(
    q,
    querySnapshot => {
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data(); // Assuming there's only one document per GoalId
        setTitle(data.title); // Set the title
      } else {
        console.error('No matching documents.');
        setTitle(''); // Reset title if no document found
      }
      // setLoading(false);
    },
    error => {
      console.error('Error getting goal title: ', error);
      // setLoading(false);
    },
  );

  return unsubscribe;
};
