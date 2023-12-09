import axios from 'axios';
import '../styles/pages/TablePage.css';
import { signOut, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EditAttemptModal from '../components/EditAttemptModal';
import deleteIcon from '../assets/icons/delete-icon.svg';
import editIcon from '../assets/icons/edit-icon.svg';

const TablePage = () => {
    const [editingAttempt, setEditingAttempt] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState([]);
    const location = useLocation();
    const auth = getAuth()

    useEffect(() => {
        fetchLoginAttempts();
    }, []);

    const handleSignOut = async() => {
        try{
            await signOut(auth);
        } catch(err: any){
            console.log("cant log out")
        }
    };

    const fetchLoginAttempts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/attempts', {
            headers: {
                Authorization: `Bearer ${location.state.idToken}`,
            },});
            const sortedAttempts = response.data.sort(
                (a:any, b:any) => b.timestamp._seconds - a.timestamp._seconds
              );
            setLoginAttempts(sortedAttempts);
        } catch (error) {
            console.error('Error fetching login attempts:', error);
        }
    };

    const handleEditAttempt = (attempt:any) => {
        setEditingAttempt(attempt);
        setShowModal(true);
    };
    
    const handleModalClose = () => {
    setEditingAttempt(null);
    setShowModal(false);
    // You may want to refetch login attempts here after editing
    };
    
    const handleEditAttemptSubmit = async (editedFields:any) => {
    if(editingAttempt && editingAttempt.id){
        try {
            // Send edited fields to the server
            await axios.put(
            `http://localhost:5000/api/attempts/${editingAttempt.id}`,
            editedFields,
            {
                headers: {
                Authorization: `Bearer ${location.state.idToken}`,
                },
            }
            );
            // Close the modal and refresh login attempts
            handleModalClose();
            fetchLoginAttempts();
        } catch (error) {
            console.error('Error updating login attempt:', error);
        }
    }
    
    };

    const handleDeleteAttempt = async (id:any) => {
        try {
            await axios.delete(`http://localhost:5000/api/attempts/${id}`, {
            headers: {
                Authorization: `Bearer ${location.state.idToken}`,
            },});
            fetchLoginAttempts();
        } catch (error) {
            console.error('Error deleting login attempt:', error);
        }
    };

    const convertTimestamp = (timestamp: any) => {
        const fireBaseTime = new Date(
            timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000,
        );
        return `${fireBaseTime.toDateString()} ${fireBaseTime.toLocaleTimeString()}`
    };

  return (
    <div className="table-verification-container"> 
        <div className="table-landing-title">Login attempts table</div>
            <div className="table-content-wrapper">
            <table className="table-wrapper">
                <thead>
                <tr>
                    <th>Email/Phone</th>
                    <th>Code</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {loginAttempts.map((attempt:any) => (
                        <tr key={attempt.id}>
                            <td>{attempt.email || attempt.phone}</td>
                            <td>{attempt.code}</td>
                            <td>{attempt.status}</td>
                            
                            
                            <td>{convertTimestamp(attempt.timestamp)}</td>
                            <td>
                                <button className="icon-button" onClick={() => handleEditAttempt(attempt)}>
                                    <img src={editIcon} alt="edit icon" />
                                </button>
                            </td>
                            <td>
                                <button className="icon-button" onClick={() => handleDeleteAttempt(attempt.id)}>
                                    <img src={deleteIcon} alt="delete icon" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && 
                <EditAttemptModal
                    attempt={editingAttempt}
                    onClose={handleModalClose}
                    onSubmit={handleEditAttemptSubmit}
                />
            }
            <button className="continue-button" onClick={() => handleSignOut()}>Sign out</button>
            </div>
    </div>
  );
};

export default TablePage;