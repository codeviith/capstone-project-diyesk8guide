import React, { useState, useEffect, useContext } from 'react';
import UnlikeIcon from './UnlikeIcon';
import { responseStyle } from './CommonStyles';
import { formatResponse } from './CommonFunctions';
import { AuthContext } from './AuthContext';


function Profile() {
    const boardOptions = ["Evolve", "Lacroix", "KalyNYC", "Metroboard", "Trampa", "Mellow", "Boosted", "Exway", "Bajaboard", "Hoyt St.", "Acton", "Backfire", "Meepo", "_DIY_", "Other"];

    const { isLoggedIn } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [boards, setBoards] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [likedImages, setLikedImages] = useState([]);
    const [editMode, setEditMode] = useState({
        fname: false,
        lname: false,
        email: false,
        rider_stance: false,
        boards_owned: false
    });
    const [editValues, setEditValues] = useState({
        fname: userData?.fname || '',
        lname: userData?.lname || '',
        email: userData?.email || '',
        rider_stance: userData?.rider_stance || '',
        boards_owned: typeof userData?.boards_owned === 'string' ? userData.boards_owned.split(',') : []   // Code to ensure this is an array
    });
    const [passwordFields, setPasswordFields] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [passwordCriteria, setPasswordCriteria] = useState({
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isLongEnough: false,
        passwordsMatch: false,
        currentPasswordMatches: false
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [timerId, setTimerId] = useState(null);

    const toggleCurrentPasswordVisibility = () => setShowCurrentPassword(!showCurrentPassword);
    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmNewPasswordVisibility = () => setShowConfirmNewPassword(!showConfirmNewPassword);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserData();
            fetchBoards();
            fetchQuestions();
            fetchUploadedImages();
            fetchLikedImages();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (userData && typeof userData.boards_owned === 'string') {
            setEditValues(prevValues => ({
                ...prevValues,
                fname: userData.fname || '',
                lname: userData.lname || '',
                email: userData.email || '',
                rider_stance: userData.rider_stance || '',
                boards_owned: Array.isArray(userData.boards_owned)
                    ? userData.boards_owned
                    : typeof userData.boards_owned === 'string'
                        ? userData.boards_owned.split(',')
                        : []
            }));
        }
    }, [userData]);

    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        };
    }, []);


    const fetchUserData = async () => {
        try {
            const response = await fetch('/user_data', { credentials: 'include' });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchBoards = async () => {
        try {
            const response = await fetch('/boards', { credentials: 'include' });
            const data = await response.json();
            setBoards(data);
        } catch (error) {
            console.error('Error fetching boards data:', error);
        }
    };

    const fetchQuestions = async () => {
        try {
            const response = await fetch('/guru', { credentials: 'include' });
            const data = await response.json();
            console.log('Questions:', data);
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching guru data:', error);
        }
    };

    const fetchUploadedImages = async () => {
        try {
            const response = await fetch('/gallery/uploaded', { credentials: 'include' });
            const data = await response.json();
            setUploadedImages(data);
        } catch (error) {
            console.error('Error fetching uploaded images', error);
        }
    };

    const fetchLikedImages = async () => {
        try {
            const response = await fetch('/gallery/liked', { credentials: 'include' });
            const data = await response.json();
            setLikedImages(data);
        } catch (error) {
            console.error('Error fetching liked images', error);
        }
    };

    const removeQuestionFromState = (questionId) => {
        setQuestions(questions.filter(question => question.id !== questionId));
    };

    const deleteQuestion = async (questionId) => {
        try {
            const response = await fetch(`/guru/${questionId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                removeQuestionFromState(questionId);
            } else {
                console.error('Error deleting question:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const saveData = async (field) => {
        try {
            const response = await fetch(`/user_data/${userData.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ [field]: editValues[field] })
            });
            const data = await response.json();
            if (response.ok) {
                setUserData({ ...userData, [field]: editValues[field] });
                setEditMode({ ...editMode, [field]: false });
            } else {
                console.error('Error updating user data:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteBoard = async (boardId) => {
        try {
            const response = await fetch(`/boards/${boardId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setBoards(boards.filter(board => board.id !== boardId));
            } else {
                console.error('Error deleting board');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const unlikeImage = async (imageId) => {
        try {
            const response = await fetch(`/gallery/unheart`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image_id: imageId })
            });
            const data = await response.json();
            if (response.ok) {
                updateLikedImagesState(imageId);
            } else {
                console.error('Error unliking image:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateLikedImagesState = (imageId) => {
        setLikedImages(likedImages.filter(image => image.id !== imageId));
    };

    const deleteUploadedImage = async (imageId) => {
        try {
            const response = await fetch(`/gallery/delete/${imageId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setUploadedImages(uploadedImages.filter(image => image.id !== imageId));
            } else {
                console.error('Error deleting uploaded image');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordFields({ ...passwordFields, [name]: value });

        if (name === 'newPassword' || name === 'confirmNewPassword') {
            const updatedPassword = name === 'newPassword' ? value : passwordFields.newPassword;
            const updatedConfirmPassword = name === 'confirmNewPassword' ? value : passwordFields.confirmNewPassword;

            setPasswordCriteria({
                ...passwordCriteria,
                hasUppercase: /[A-Z]/.test(updatedPassword),
                hasLowercase: /[a-z]/.test(updatedPassword),
                hasNumber: /[0-9]/.test(updatedPassword),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(updatedPassword),
                isLongEnough: updatedPassword.length >= 6,
                passwordsMatch: updatedPassword === updatedConfirmPassword
            });
        }

        if (name === 'currentPassword') {
            checkCurrentPassword(value);
        }
    };

    const checkCurrentPassword = async (currentPassword) => {
        try {
            const response = await fetch('/check-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentPassword }),
                credentials: 'include',
            });

            const data = await response.json();
            if (data.matches) {
                setPasswordCriteria(prev => ({ ...prev, currentPasswordMatches: true }));
            } else {
                setPasswordCriteria(prev => ({ ...prev, currentPasswordMatches: false }));
            }
        } catch (error) {
            console.error('Error checking current password:', error);
        }
    };

    const validateAndSavePassword = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (passwordFields.newPassword === passwordFields.currentPassword) {
            setPasswordError("New password cannot be the same as current password");
            return;
        }

        if (passwordFields.newPassword !== passwordFields.confirmNewPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        if (!passwordRegex.test(passwordFields.newPassword)) {
            setPasswordError("Password must contain at least one upper and lowercase letter, one number, one special character, and be at least 6 characters long.");
            return;
        }

        const dataToSend = {
            currentPassword: passwordFields.currentPassword,
            newPassword: passwordFields.newPassword
        };

        try {
            const response = await fetch('/change_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                setPasswordSuccess("Password changed successfully.");
                setPasswordError('');
                setPasswordFields({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
                setEditMode({ ...editMode, password: false });

                if (timerId) clearTimeout(timerId);

                const newTimerId = setTimeout(() => {
                    setPasswordSuccess('');
                }, 5000);

                setTimerId(newTimerId);

            } else {
                setPasswordError(data.error);
                setPasswordSuccess('');
            }
        } catch (error) {
            setPasswordError("Failed to change password.");
            setPasswordSuccess('');
        }
    };

    const resetPasswordFields = () => {
        setPasswordCriteria({
            hasUppercase: false,
            hasLowercase: false,
            hasNumber: false,
            hasSpecialChar: false,
            isLongEnough: false,
            passwordsMatch: false,
            currentPasswordMatches: false
        });
        setPasswordFields({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        setPasswordError('');
        setPasswordSuccess('');
    };

    const resetEditValues = () => {
        setEditValues({
            fname: userData?.fname || '',
            lname: userData?.lname || '',
            email: userData?.email || '',
            rider_stance: userData?.rider_stance || '',
            boards_owned: typeof userData?.boards_owned === 'string' ? userData.boards_owned.split(',') : []
        });
    };


    return (
        <div className="profile"> {/* Apply 'profile' class name */}
            {isLoggedIn ? (
                <div>

                    {/* Account Section */}
                    <section>
                        <h2>Account</h2>
                        {userData && (
                            <div className='user-data-container'>

                                {/* First Name */}
                                <div className="user-data-field">
                                    <strong className="user-data-label">First Name:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.fname ? (
                                            <input className="user-data-input"
                                                value={editValues.fname}
                                                onChange={(e) => setEditValues({ ...editValues, fname: e.target.value })}
                                            />
                                        ) : (
                                            <span className="user-data-value">{userData.fname}</span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.fname && <button className="save-button" onClick={() => saveData('fname')}>Save</button>}
                                        <button className="edit-button"
                                            onClick={() => {
                                                setEditMode({ ...editMode, fname: !editMode.fname });
                                                if (editMode.fname) {
                                                    resetEditValues();
                                                }
                                            }}
                                        >
                                            {editMode.fname ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="user-data-field">
                                    <strong className="user-data-label">Last Name:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.lname ? (
                                            <input className="user-data-input"
                                                value={editValues.lname}
                                                onChange={(e) => setEditValues({ ...editValues, lname: e.target.value })}
                                            />
                                        ) : (
                                            <span className="user-data-value">{userData.lname}</span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.lname && <button className="save-button" onClick={() => saveData('lname')}>Save</button>}
                                        <button className="edit-button"
                                            onClick={() => {
                                                setEditMode({ ...editMode, lname: !editMode.lname });
                                                if (editMode.lname) {
                                                    resetEditValues();
                                                }
                                            }}
                                        >
                                            {editMode.lname ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="user-data-field">
                                    <strong className="user-data-label">Email:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.email ? (
                                            <input className="user-data-input"
                                                value={editValues.email}
                                                onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                                            />
                                        ) : (
                                            <span className="user-data-value">{userData.email}</span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.email && <button className="save-button" onClick={() => saveData('email')}>Save</button>}
                                        <button className="edit-button"
                                            onClick={() => {
                                                setEditMode({ ...editMode, email: !editMode.email });
                                                if (editMode.email) {
                                                    resetEditValues();
                                                }
                                            }}
                                        >
                                            {editMode.email ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="user-data-field">
                                    <strong className="user-data-label">Password:</strong>
                                    {passwordSuccess && <div className="password-success-message">{passwordSuccess}</div>}
                                    {passwordError && <div className="password-error-message">{passwordError}</div>}
                                    <div className="input-and-buttons">
                                        {editMode.password ? (
                                            <div>
                                                {/* Current Password Input */}
                                                <label className='password-label'>
                                                    Current Password:
                                                    <div className="password-container">
                                                        <input className="password-user-data-input"
                                                            type={showCurrentPassword ? "text" : "password"}
                                                            name="currentPassword"
                                                            value={passwordFields.currentPassword}
                                                            onChange={handlePasswordChange}
                                                        />
                                                        <button className="current-password-toggle-button"
                                                            type="button"
                                                            onMouseDown={toggleCurrentPasswordVisibility}
                                                            onMouseUp={toggleCurrentPasswordVisibility}>
                                                            👁️
                                                        </button>
                                                        <div className='profile-password-criteria'>
                                                            <span style={{ color: passwordCriteria.currentPasswordMatches ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.currentPasswordMatches ? 'bold' : 'normal' }}>
                                                                current password match
                                                            </span>
                                                        </div>
                                                    </div>
                                                </label>
                                                {/* New Password Input */}
                                                <label className='password-label'>
                                                    New Password:
                                                    <div className="password-container">
                                                        <input className="password-user-data-input"
                                                            type={showNewPassword ? "text" : "password"}
                                                            name="newPassword"
                                                            value={passwordFields.newPassword}
                                                            onChange={handlePasswordChange}
                                                        />
                                                        <button className="new-password-toggle-button"
                                                            type="button"
                                                            onMouseDown={toggleNewPasswordVisibility}
                                                            onMouseUp={toggleNewPasswordVisibility}>
                                                            👁️
                                                        </button>
                                                        <div className='profile-password-criteria'>Have at least:
                                                            <span style={{ color: passwordCriteria.hasUppercase ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasUppercase ? 'bold' : 'normal' }}>
                                                                one uppercase letter,
                                                            </span>
                                                            <span style={{ color: passwordCriteria.hasLowercase ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasLowercase ? 'bold' : 'normal' }}>
                                                                one lowercase letter,
                                                            </span>
                                                            <span style={{ color: passwordCriteria.hasNumber ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasNumber ? 'bold' : 'normal' }}>
                                                                one number,
                                                            </span>
                                                            <span style={{ color: passwordCriteria.hasSpecialChar ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.hasSpecialChar ? 'bold' : 'normal' }}>
                                                                one special character,
                                                            </span>
                                                            <span style={{ color: passwordCriteria.isLongEnough ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.isLongEnough ? 'bold' : 'normal' }}>
                                                                6 characters
                                                            </span>
                                                        </div>
                                                    </div>
                                                </label>
                                                {/* Confirm New Password Input */}
                                                <label className='password-label'>
                                                    Confirm New Password:
                                                    <div className="password-container">
                                                        <input className="password-user-data-input"
                                                            type={showConfirmNewPassword ? "text" : "password"}
                                                            name="confirmNewPassword"
                                                            value={passwordFields.confirmNewPassword}
                                                            onChange={handlePasswordChange}
                                                        />
                                                        <button className="confirm-new-password-toggle-button"
                                                            type="button"
                                                            onMouseDown={toggleConfirmNewPasswordVisibility}
                                                            onMouseUp={toggleConfirmNewPasswordVisibility}>
                                                            👁️
                                                        </button>
                                                        <div className="profile-password-criteria">
                                                            <span style={{ color: passwordCriteria.passwordsMatch ? 'darkgreen' : 'darkred', fontWeight: passwordCriteria.passwordsMatch ? 'bold' : 'normal' }}>
                                                                new passwords match
                                                            </span>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        ) : (
                                            <span className="user-data-value">***************</span>
                                            // The *'s are only there as a placeholder for password
                                            // It is NEVER a good practice to display the actual password on frontend.
                                        )}
                                        {/* Edit Button */}
                                        {editMode.password && <button className="save-button" onClick={validateAndSavePassword}>Save</button>}
                                        <button className="edit-button" onClick={() => {
                                            setEditMode({ ...editMode, password: !editMode.password });
                                            resetPasswordFields();
                                        }}>
                                            {editMode.password ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                {/* Rider Stance */}
                                <div className="user-data-field">
                                    <strong className="user-data-label">Rider Stance:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.rider_stance ? (
                                            <select className="user-data-select"
                                                value={editValues.rider_stance}
                                                onChange={(e) => setEditValues({ ...editValues, rider_stance: e.target.value })}
                                            >
                                                <option value="Regular">Regular</option>
                                                <option value="Goofy">Goofy</option>
                                                <option value="Both">Both</option>
                                            </select>
                                        ) : (
                                            <span className="user-data-value">{userData.rider_stance}</span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.rider_stance && <button className="save-button" onClick={() => saveData('rider_stance')}>Save</button>}
                                        <button className="edit-button"
                                            onClick={() => {
                                                setEditMode({ ...editMode, rider_stance: !editMode.rider_stance });
                                                if (editMode.rider_stance) {
                                                    resetEditValues();
                                                }
                                            }}
                                        >
                                            {editMode.rider_stance ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                {/* Boards Owned */}
                                <div className="user-data-field">
                                    <strong className="user-data-label">Boards Owned:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.boards_owned ? (
                                            <div className="checkbox-container">
                                                {boardOptions.map((board, index) => (
                                                    <div key={index}>
                                                        <input className='user-data-checkbox'
                                                            type="checkbox"
                                                            name="boards_owned"
                                                            value={board}
                                                            checked={editValues.boards_owned.includes(board)}
                                                            onChange={(e) => {
                                                                let newSelection;
                                                                if (e.target.checked) {
                                                                    newSelection = [...editValues.boards_owned, board];
                                                                } else {
                                                                    newSelection = editValues.boards_owned.filter(item => item !== board);
                                                                }
                                                                setEditValues({ ...editValues, boards_owned: newSelection });
                                                            }}
                                                        />
                                                        <label>{board}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="user-data-value">
                                                {Array.isArray(userData.boards_owned)
                                                    ? userData.boards_owned.join(', ')
                                                    : (userData.boards_owned || '').split(',').join(', ')}
                                            </span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.boards_owned && <button className="save-button" onClick={() => saveData('boards_owned')}>Save</button>}
                                        <button className="edit-button"
                                            onClick={() => {
                                                setEditMode({ ...editMode, boards_owned: !editMode.boards_owned });
                                                if (editMode.boards_owned) {
                                                    resetEditValues();
                                                }
                                            }}
                                        >
                                            {editMode.boards_owned ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )}
                    </section>

                    {/* Boards Generated Section */}
                    {boards.length > 0 && (
                        <section>
                            <h2>Boards Generated</h2>
                            <div className="profile-boards-container">
                                {boards.map((board, index) => (
                                    <div className='profile-board-div' key={index} style={responseStyle}>
                                        <strong className='profile-board-number'> Board {index + 1}</strong>
                                        <ul className='profile-board-spec'>
                                            <strong className='profile-board-strong'> Deck </strong>
                                            <li>Deck Type: {board.deck_type}</li>
                                            <li>Deck Length: {board.deck_length}</li>
                                            <li>Deck Material: {board.deck_material}</li>
                                            <strong className='profile-board-strong'> Truck </strong>
                                            <li>Truck Type: {board.truck_type}</li>
                                            <li>Truck Width: {board.truck_width}</li>
                                            <strong className='profile-board-strong'> Controller </strong>
                                            <li>Controller Feature: {board.controller_feature}</li>
                                            <li>Controller Type: {board.controller_type}</li>
                                            <strong className='profile-board-strong'> Remote </strong>
                                            <li>Remote Feature: {board.remote_feature}</li>
                                            <li>Remote Type: {board.remote_type}</li>
                                            <strong className='profile-board-strong'> Motor </strong>
                                            <li>Motor Size: {board.motor_size}</li>
                                            <li>Motor Kv: {board.motor_kv}</li>
                                            <strong className='profile-board-strong'> Wheel </strong>
                                            <li>Wheel Size: {board.wheel_size}</li>
                                            <li>Wheel Type: {board.wheel_type}</li>
                                            <strong className='profile-board-strong'> Battery </strong>
                                            <li>Battery Voltage: {board.battery_voltage}</li>
                                            <li>Battery Type: {board.battery_type}</li>
                                            <li>Battery Capacity: {board.battery_capacity}</li>
                                            <li>Battery Configuration: {board.battery_configuration}</li>
                                            <strong className='profile-board-strong'> Range </strong>
                                            <li>Range: {board.range_mileage}</li>
                                        </ul>
                                        {/* Delete Button */}
                                        <button className="delete-board-button" onClick={() => deleteBoard(board.id)}>
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Questions Asked Section */}
                    {questions.length > 0 && (
                        <section>
                            <h2>Questions Asked</h2>
                            <div className='questions-asked-container'>
                                {questions.map((question, index) => (
                                    <div className='questions-asked' key={index} style={responseStyle}>
                                        <div className='question-container'>
                                            <div className='question-div'><strong className='question-strong'>Question:</strong> {question.user_input}</div>
                                            <div className='answer-div'><strong className='answer-strong'>Answer:</strong> {formatResponse(question.answer)}</div>
                                            <div className='delete-question-button-container'>
                                                <button className='delete-question-button' onClick={() => deleteQuestion(question.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Uploaded Images Section */}
                    {uploadedImages.length > 0 && (
                        <section>
                            <h2>Uploaded Images</h2>
                            <div className='uploaded-image-container'>
                                {uploadedImages.map((image, index) => (
                                    <div className='uploaded-images' key={index}>
                                        <img className='image-src' src={image.image_url} alt="Uploaded" />
                                        <div className="image-details">
                                            <p><strong className='image-details-strong'>Deck Type:</strong> {image.deck_brand} {image.deck_size} in.</p>
                                            <p><strong className='image-details-strong'>Battery Type:</strong> {image.battery_series}s {image.battery_parallel}p</p>
                                            <p><strong className='image-details-strong'>Motor Type:</strong> {image.motor_size} {image.motor_kv}Kv {image.motor_power}Watts</p>
                                            <p><strong className='image-details-strong'>Wheel Type:</strong> {image.wheel_size} {image.wheel_type}</p>
                                            <p><strong className='image-details-strong'>Max Speed & Range:</strong> {image.max_speed} MPH, {image.max_range} Miles</p>
                                            <p><strong className='image-details-strong'>Other Features:</strong><p className='image-details-other-features'>{image.other_features}</p></p>
                                            <p className='rating'><strong className='image-details-strong'>Rating:</strong> {image.hearts}</p>
                                            <p className='delete-uploaded-image-button-container'><button className="delete-uploaded-image-button" onClick={() => deleteUploadedImage(image.id)}>Delete</button></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Liked Images Section */}
                    {likedImages.length > 0 && (
                        <section>
                            <h2>Liked Images</h2>
                            <div className='liked-image-container'>
                                {likedImages.map((image, index) => (
                                    <div className='liked-images' key={index}>
                                        <img className='image-src' src={image.image_url} alt="Liked" />
                                        <div className="image-details">
                                            <p><strong className='image-details-strong'>Deck Type:</strong> {image.deck_brand} {image.deck_size} in.</p>
                                            <p><strong className='image-details-strong'>Battery Type:</strong> {image.battery_series}s {image.battery_parallel}p</p>
                                            <p><strong className='image-details-strong'>Motor Type:</strong> {image.motor_size} {image.motor_kv}Kv {image.motor_power}Watts</p>
                                            <p><strong className='image-details-strong'>Wheel Type:</strong> {image.wheel_size} {image.wheel_type}</p>
                                            <p><strong className='image-details-strong'>Max Speed & Range:</strong> {image.max_speed} MPH, {image.max_range} Miles</p>
                                            <p><strong className='image-details-strong'>Other Features:</strong><p className='image-details-other-features'>{image.other_features}</p></p>
                                            <p className='rating'><strong className='image-details-strong'>Rating:</strong> {image.hearts}</p>
                                        </div>
                                        <div className='unlike-button'
                                            onClick={() => unlikeImage(image.id)}
                                            title="Unlike"
                                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                        >
                                            <UnlikeIcon />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;
