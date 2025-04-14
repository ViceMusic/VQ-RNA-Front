import React, { createContext, useContext, useReducer } from 'react';

// 初始状态
const initialState = {
  taskList: [] // 初始数列
};

// 创建Context
const NumberContext = createContext();

// 定义reducer（处理状态更新）
const reducer = (state, action) => {
  switch (action.type) {
    case 'NEW_TASKS':
      return {
        taskList: action.tasks // 完全替换数列
      };
    default:
      return state; //返回当前状态, 也就是无需进行修改
  }
};

// Context Provider组件
export const NumberProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 封装修改数列的action
  const updateTasks = (tasks) => {
    dispatch({ type: 'UPDATE_NUMBER', payload: newList });
  };


  return (
    <NumberContext.Provider value={{ 
      numbers: state.numberList, 
      updateTasks,
    }}>
      {children}
    </NumberContext.Provider>
  );
};

// 自定义Hook, 直接调用这个hook作为函数就可以了
export const useNumberContext = () => {
  return useContext(NumberContext);
};