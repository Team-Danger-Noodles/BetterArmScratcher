import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Category from './components/Category';
import Users from './components/Users';
import { api } from './utils/api';



const todoID = uuidv4();




//NEED TO GIVE PROJECTS 

//need to do an API call to backend w/ the array of category ID's 
//--> find categories info there, and respond with them in the structure below, so the front end can render

const initialCategories = {
  [todoID]: {
    name: 'Todo',
    items: [],
  },
};

console.log('INIT CATE: ', initialCategories);

const onDragEnd = (result, categories, setCategories, users, setUsers) => {
  const { source, destination } = result;
  console.log('result:', result);
  console.log('source:', source);
  console.log('Destination', destination);
  
  // Checks if item was dropped outside of the droppable environment
  if (!destination) return;

  if (source.droppableId === 'usersCategory') {
    console.log('all users: ', users);
    const copiedUsers = [...users];
    console.log(copiedUsers);
    const [removed] = copiedUsers.splice(source.index, 1);
    copiedUsers.splice(destination.index, 0, removed);

    setUsers(copiedUsers);
  } else if (source.droppableId === destination.droppableId) {
    // Reordering tasks within the same category
    const category = categories[source.droppableId];
    console.log(categories);
    console.log(categories[source.droppableId]);
    const copiedItems = [...category.items];
    console.log([...category.items]);
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    setCategories({
      ...categories,
      [source.droppableId]: {
        ...category,
        items: copiedItems,
      },
    });
  } else {
    //BACKEND CALLS
    console.log(result.draggableId)
    console.log(result.source.droppableId)
    console.log(result.destination.droppableId)

    api.swapTasks({taskId: result.draggableId, sourceId: result.source.droppableId, destinationId: result.destination.droppableId});




    // Moving tasks between different categories
    console.log(source);
    console.log(destination);
    const sourceCategory = categories[source.droppableId];
    const destCategory = categories[destination.droppableId];
    const sourceItems = [...sourceCategory.items];
    const destItems = [...destCategory.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setCategories({
      ...categories,
      [source.droppableId]: {
        ...sourceCategory,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destCategory,
        items: destItems,
      },
    });
  }
};



export default function Homepage(){
  const navigate = useNavigate();
  const [categories, setCategories] = useState(initialCategories);
  const [users, setUsers] = useState([]);



  useEffect(() => {
    async function loadUsers() {
      try {
        const userData = await api.getUsers('Project0');
        setUsers(userData);
      } catch (error) {
        console.error('ERROR', error);
      }
    }

    async function loadCategories() {
      try {
        const allCategories = await api.getCategories('Project0');
        console.log('allCategories: ', allCategories);

        setCategories(allCategories);
        console.log('CATEGORIES IN USE EFFECT:', categories);
      } catch(error) {
        console.error('ERROR', error);
      }
    }


    loadUsers();
    loadCategories(); // 
  }, []);







  const addNewCategory = async () => {
    const newId = uuidv4();
    //const projectName = "Project0" --> need to pull in the active project name, once we have that available from database

    await api.createCategory({ categoryId: newId, name: 'New Category', projectName: 'Project0'});

    setCategories({
      ...categories,
      [newId]: {
        name: 'New Category',
        items: [],
      },
    });
  };

  const addNewTask = (categoryId, task) => {
    const category = categories[categoryId];
    const newItems = [...category.items, task];
    setCategories({
      ...categories,
      [categoryId]: {
        ...category,
        items: newItems,
      },
    });
  };

  const addNewUser = (user) => {
    // console.log('New user:', user);
    // console.log('Adding to: ', users);
    setUsers((users) => {
      const updatedUsers = [...users, user];
      // console.log('New user list:', updatedUsers);
      return updatedUsers;
    });
  };
  
  const removeTask = (categoryId, removedTask) => {
    const category = categories[categoryId];

    const arr = categories[categoryId].items;
    console.log('Items -> ', categories[categoryId].items);
    console.log('Removed Task -> ', removedTask);
    console.log('same item ', categories[categoryId].items[0] === removedTask);
    console.log('index of ->', categories[categoryId].items.indexOf(removedTask));


    const newArr = arr.filter((obj) => {
      console.log('obj ->', obj);
      return obj._id !== removedTask._id;
    });

    console.log('new arr ->', newArr);

    setCategories({
      ...categories,
      [categoryId]: {
        ...category,
        items: newArr,
      },
    });
  };

  const removeUser = ({userId, projectName}) => {
    setUsers((prevUsers) => {
      api.removeUser({userId, projectName});
      const updatedUsers = prevUsers.filter((user) => user._id !== userId);
      console.log('Users before:', prevUsers);
      console.log('Users after:', updatedUsers);
      return updatedUsers;
    });
  };

  const editTask = (categoryId, edittedTask) => {
    const category = categories[categoryId];
    const newItems = edittedTask;

    setCategories({
      ...categories,
      [categoryId]: {
        ...category,
        items: newItems,
      },
    });
  };

  const handleLogOut = () => {
    navigate('/login');
   
  };

  return (
    <div className='app'>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, categories, setCategories, users, setUsers)}
      >
        <div className='categories-container'>
          <Users userId={'usersCategory'} users={users} addNewUser={addNewUser} removeUser={removeUser} />
          {Object.entries(categories).map(([id, category]) => (
            <Category key={id} categoryId={id} category={category} addNewTask={addNewTask} removeTask={removeTask} editTask={editTask}/>
          ))}
          <div className='add-category-container'>
            <button onClick={addNewCategory} className="add-category-button"> + New Section</button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );

  
          }