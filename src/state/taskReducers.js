export let initialState = [
	{
    id: 1,
    title: "Learning Python",
    description: "Implement a Python solution to synchronize data between an API and a third-party database securely, optimizing data exchange.",
    tags: ["python", "api", "data synchronization"],
		priority: "Low",
    isFavorite: true
  },
	{
    id: 2,
    title: "Learning Java",
    description: "Khub kore Java Shikte hobe",
    tags: ["android", "java", "programming"],
		priority: "High",
    isFavorite: false
  },
]

export const reducer = (state, action) => {
  if(action.type === 'ADD_TASK'){
    return [...state, action.payload]
  }
  else if(action.type === 'EDIT_TASK'){
    return state.map(task => {
      if(task.id === action.payload.id){
        return action.payload
      }
      return task
    })
  }
  else if(action.type === 'DELETE_TASK'){
    return state.filter(task => task.id !== action.payload)
  }
  else if(action.type === 'DELETE_ALL'){
    state.length = 0;
    return [...state]
  }
  else{
    return state
  }
}