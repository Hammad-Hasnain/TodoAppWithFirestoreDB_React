// import { Stack } from '@mui/material'
// import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import { deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import LogoutIcon from '@mui/icons-material/Logout';
import { Bounce, ToastContainer, toast } from 'react-toastify';



const Todo = () => {

    const [todoInp, setTodoInp] = useState('')
    const [todoArr, setTodoArr] = useState([])
    const [isToggle, setIsToggle] = useState(false)
    const [isTodo, setIsTodo] = useState(true)

    const navigate = useNavigate()



    // react toastify success
    const notifySuccess = () => toast.success('Todo added', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

    const logOutHandler = () => {

        // console.log('logout')
        localStorage.clear()
        // redirected to login page if logout
        !localStorage.getItem('user uid') && navigate('/login')


    }
    // console.log(styles)

    const inpHandler = (e) => {
        // console.log(e.target.value)
        // setTodoInp(prev => ([...prev, e.target.value]))

        setTodoInp(e.target.value)
        // console.log(e.target.value)




        // e.target.value = ''
    }

    const uId = localStorage.getItem('user uid')




    const addTodo = async () => {
        try {

            // isTodo ? await updateDoc(doc(db, 'Todos', uId), { todos: [] }) : setIsTodo(false)

            // const uId = localStorage.getItem('user uid')


            const docSnap = await getDoc(doc(db, 'Todos', uId))
            // console.log(docSnap.data())
            // console.log(docSnap.data().todos)
            // console.log(docSnap.data().todos[0])
            const arr = docSnap.data().todos;
            // console.log(arr)


            // new  local array with inp value
            const todosArr = [...arr, todoInp];  // storing todo data in array for updating todos in db woth prev values
            // console.log('todos=======>', todosArr)




            // setDoc(doc(db, 'Todos', uId), { todos: [...todosArr] })
            setDoc(doc(db, 'Todos', uId), { todos: todosArr })


            setTodoArr(docSnap.data().todos)
            // console.log(todoArr)
            setIsToggle(!isToggle)
            //  setTodoInp('')



            notifySuccess()

        } catch (error) {
            console.log('catch error from addTodo====>', error)
            alert('catch error from addTodo====>', error)
        }


    }

    const getting = async () => {

        try {
            const docSnap = await getDoc(doc(db, 'Todos', uId))
            console.log(docSnap.data())
            console.log(docSnap.data().todos)

            setTodoArr(docSnap.data().todos)
            console.log(todoArr)


            // setTodoInp('')

        } catch (error) {
            console.log(error)
        }

    }
    // console.log(todoArr)
    // console.log(myArr)


    useEffect(() => {

        getting()

    }, [isToggle])


    const edit = (e, i) => {
        // console.log('edit', e, i)

        // const uId = localStorage.getItem('user uid')

        todoArr[i] = prompt('Enter new todo'),
            // console.log(todoArr)


            // updateDoc(doc(db, 'Todos', uId), { todos: [...todoArr] })
            updateDoc(doc(db, 'Todos', uId), { todos: todoArr })

        setIsToggle(!isToggle)

    }


    const deleted = (e, i) => {
        // console.log('delete', e, i)
        const uId = localStorage.getItem('user uid')

        todoArr.splice(i, 1)

        // console.log('deleted array ===> ', todoArr)
        updateDoc(doc(db, 'Todos', uId), { todos: [...todoArr] })
        setIsToggle(!isToggle)

    }


    return (
        <div style={{ backgroundColor: 'chocolate', height: '100vh', padding: '10px' }}>

            {/* <button onClick={getting}>getting</button> */}
            <ToastContainer />
            <h1 className={styles.todo}>TODO</h1>
            <button className={styles.logOut} onClick={logOutHandler}><LogoutIcon /></button>

            <div className={styles.mainDiv}>
                <div style={{ padding: '10px', boxShadow: '0 0 10px #000' }}>
                    <input className={styles.inp}
                        onChange={inpHandler} type="text" />
                    <button className={styles.addBtn} onClick={addTodo}>ADD +</button>
                </div>
                <ul className={styles.todoItem}>
                    {todoArr.map((e, i) => <li key={i} className={styles.li}> <span style={{ display: 'block' }}>{i + 1}. {e}</span>

                        <span style={{ display: 'flex' }}>
                            <button className={styles.liBtn} onClick={() => { edit(e, i) }}><EditIcon /></button>
                            <button className={styles.liBtn} onClick={() => { deleted(e, i) }}><ClearIcon /> </button>
                        </span>
                    </li>


                    )}

                </ul>

            </div>

        </div>

    )
}

export default Todo