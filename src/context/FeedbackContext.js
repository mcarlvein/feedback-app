import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is from context',
            rating: 10
        }
    ])
    const [feedbackEdit, setfeedbackEdit] = useState({
        item: {},
        edit: false
    })

    //Delete feedback item
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    //Add feedback item
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback]);
    }

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => (
            item.id === id ? {...item, ...updItem} : item
        )))
    }

    //Set item to be updated
    const editFeedback = (item) => {
        setfeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        updateFeedback,
        editFeedback,
        }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;