// import AuthContext from '../context/AuthContext';
// import { useContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';

// const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }

//     const [role, setRole] = useState<string | null>(null);

//     useEffect(() => {
//         getTokenAndDecode();
//     }, [role, context, context.isAuthenticated]);

//     const getTokenAndDecode = async () => {
//         try {
//             const token = await AsyncStorage.getItem('access_token');
//             if (token) {
//                 const decoded: any = jwtDecode(token);
//                 setRole(decoded.role);
//                 context.token = token;
//             }
//         } catch (error) {
//             console.error('Failed to retrieve or decode token:', error);
//         }
//     };

//     return {
//         ...context,
//         role,
//     };
// };

// export default useAuth;
