const BASE_URL = 'http://localhost:3000';

export const api = {
  createCategory: async (categoryData) => {
    const response = await fetch(`${BASE_URL}/route/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    return await response.json();
  },

  removeCategory: async (categoryData) => {
    const response = await fetch(`${BASE_URL}/route/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    return await response.json();
  },

  addTaskToCategory: async (categoryAndTaskInfo) => {
    const response = await fetch(`${BASE_URL}/route/category/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryAndTaskInfo),
    });
    return await response.json();
  },

  createUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/route/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  

  removeUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/route/user?userId=${userData.userId}&projectName=${userData.projectName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  },

  createTask: async (taskData) => {
    const response = await fetch(`${BASE_URL}/route/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  },

  removeTask: async (taskData) => {
    const response = await fetch(`${BASE_URL}/route/task`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  },

  editTask: async (taskData) => {
    const response = await fetch(`${BASE_URL}/route/task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  },

  // PROJECT REQUESTS
  addProject: async (projectInfo) => {
    const response = await fetch(`${BASE_URL}/route/project`, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectInfo),
    });
    return await response.json();
  },

  getProject: async (projectInfo) => {
    const response = await fetch(`${BASE_URL}/route/project`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // ?????????????????????? How to send req.params???
      params: JSON.stringify(projectInfo),
    });
    return await response.json();
  },


  getUsers: async (projectInfo) => {
    const response = await fetch(`${BASE_URL}/route/user?projectName=${projectInfo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: JSON.stringify(projectInfo),
    });
    return await response.json();
  },


  getCategories: async (projectInfo) => {
    const response = await fetch(`${BASE_URL}/route/category?projectName=${projectInfo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: JSON.stringify(projectInfo),
    });
    return await response.json();
  },

};

