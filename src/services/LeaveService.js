/**
 * This is used to create the mock apis and database
 * In this we have used the localstorage to store user login and aurthentication

 */

const KEYS = {
  USERS: 'users',
  LEAVES: 'leaves',
  CURRENT_USER: 'currentUser',
};

// if there is no data in local storage then data is initialized
if (!localStorage.getItem(KEYS.USERS)) {
  const initialUsers = [
    {
      username: 'user',
      password: 'user', 
      role: 'employee',
      leaveBalance: 20,
    },
    {
      username: 'admin',
      password: 'admin',
      role: 'admin',
      leaveBalance: 0, // Admin has no leave balance
    },
  ];
  localStorage.setItem(KEYS.USERS, JSON.stringify(initialUsers)); // Initilize the data in localstorage
}

if (!localStorage.getItem(KEYS.LEAVES)) {
  localStorage.setItem(KEYS.LEAVES, JSON.stringify([]));
}


/**
   * This function is used to handle the login process
   * @param {username,paswword}  - they are the username and password entred by the user
   */
export const login = (username, password) => {
  const users = JSON.parse(localStorage.getItem(KEYS.USERS)); // get user details stored in localstorage
  const user = users.find((u) => u.username === username && u.password === password);// check if user exsit
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user)); // set the user to current user if it exist and authentication is suscessful
    return user;
  }
  return null;
};

/**
   * This function is used to get the deatiled of current loged in user
   
   */
export const getCurrentUser = () => {
  const user = localStorage.getItem(KEYS.CURRENT_USER); // get the current user from local storage
  return user ? JSON.parse(user) : null;
};

/**
   * This function is used to get the log-out the use and update it in local storage
   */
export const logout = () => {
  localStorage.removeItem(KEYS.CURRENT_USER);
  
};

/**
   * This function is used to handle the apply leave process
   * @param {leave}  - data sumbitted by the user in apply leave form
   */
export const applyLeave = (leave) => {
  const user = getCurrentUser();
  if (!user || user.role !== 'employee') return;
  const leaves = JSON.parse(localStorage.getItem(KEYS.LEAVES)) || [];
  const newLeave = { 
    id: Date.now(), // Unique ID using timestamp
    username: user.username,
    ...leave,
    status: 'Pending',
  };
  leaves.push(newLeave);
  localStorage.setItem(KEYS.LEAVES, JSON.stringify(leaves)); // store the updated leave data in local storage
};

/**
   * This function is used to fetch the user leaves request
   * @param {username}  -  username of the user
   */
export const getUserLeaves = (username) => {
  const leaves = JSON.parse(localStorage.getItem(KEYS.LEAVES)) || [];
  return leaves.filter((l) => l.username === username);
};

/**
   * This function is used to fetch the pending user leaves request
   */
export const getPendingLeaves = () => {
  const leaves = JSON.parse(localStorage.getItem(KEYS.LEAVES)) || [];
  return leaves.filter((l) => l.status === 'Pending');
};

  /**
   * This function is used to approve the user leaves request
   * @param {id}  -  id of user leave request
   */
export const approveLeave = (id) => {
  const leaves = JSON.parse(localStorage.getItem(KEYS.LEAVES)) || [];
  const leaveIndex = leaves.findIndex((l) => l.id === id);
  if (leaveIndex !== -1) {
    leaves[leaveIndex].status = 'Approved';
    // Calculate and deduct leave days from balance
    const leave = leaves[leaveIndex];
    const users = JSON.parse(localStorage.getItem(KEYS.USERS));
    const userIndex = users.findIndex((u) => u.username === leave.username);
    if (userIndex !== -1) {
      const from = new Date(leave.fromDate);
      const to = new Date(leave.toDate);
      const days = Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;
      users[userIndex].leaveBalance -= days;
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
    localStorage.setItem(KEYS.LEAVES, JSON.stringify(leaves));
  }
};

/**
   * This function is used to reject the user leaves request
   * @param {id}  -  id of user leave request
   */
export const rejectLeave = (id) => {
  const leaves = JSON.parse(localStorage.getItem(KEYS.LEAVES)) || [];
  const leaveIndex = leaves.findIndex((l) => l.id === id);
  if (leaveIndex !== -1) {
    leaves[leaveIndex].status = 'Rejected';
    localStorage.setItem(KEYS.LEAVES, JSON.stringify(leaves));
  }
};

/**
   * This function is used to fetch the remaning leave balance of user
   * @param {username}  -  username of the user
   */
export const getLeaveBalance = (username) => {
  const users = JSON.parse(localStorage.getItem(KEYS.USERS));
  const user = users.find((u) => u.username === username);
  return user ? user.leaveBalance : 0;
};