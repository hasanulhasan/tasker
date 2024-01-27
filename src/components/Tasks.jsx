/* eslint-disable react-refresh/only-export-components */
import Task from "./Task";
import { createContext, useReducer, useState } from "react";
import TaskModal from "./TaskModal";
import { initialState, reducer } from "../state/taskReducers";
export const MODAL_CONTEXT = createContext();

export default function Tasks() {
	const [tasks, dispatch] = useReducer(reducer, initialState)
	const [modalOpen, setModalOpen] = useState(false)
	const [taskToUpdate, setTaskToUpdate] = useState(null)
	const [searchTerm, setSearchTerm] = useState('');

	const handleTaskMutation = (createdTask, isAdd) => {
		if(isAdd){
			dispatch({type: 'ADD_TASK', payload: createdTask})
		}
		else{
			dispatch({type: 'EDIT_TASK', payload: createdTask})
		}
		setTaskToUpdate(null)
	}

	const handleEditTask = (updateToTask) => {
		setTaskToUpdate(updateToTask)
		setModalOpen(true)
	}

	const handleDelete = (id) => {
		dispatch({type: 'DELETE_TASK', payload: id})
	}

	const handleFavorite = (id) => {
		dispatch({type: 'FAVORITE', payload: id})
	}
	
	const handleDeleteAll = () => {
		dispatch({type: 'DELETE_ALL'})
	}


  return (
    <section className="mb-20" id="tasks">
		<div className="container">
			{ modalOpen && 
			<MODAL_CONTEXT.Provider value={{setModalOpen,handleTaskMutation,taskToUpdate,setTaskToUpdate}}>
			<TaskModal />
			</MODAL_CONTEXT.Provider>
			}
		{/* <!-- Search Box Ends --> */}
			<div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
				<div className="mb-14 items-center justify-between sm:flex">
					<h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
					<div className="flex items-center space-x-5">
						<form>
							<div className="flex">
								<div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
									<input onChange={(e)=> setSearchTerm(e.target.value)} type="search" id="search-dropdown"
										className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none" placeholder="Search Task"
										required />
									<button type="submit" className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4">
										<svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
											viewBox="0 0 20 20">
											<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
												d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
										</svg>
										<span className="sr-only">Search</span>
									</button>
								</div>
							</div>
						</form>
						<button onClick={()=> setModalOpen(!modalOpen)} className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold">Add Task</button>
						<button onClick={()=> handleDeleteAll()} className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold">Delete All</button>
					</div>
				</div>
				<div className="overflow-auto">
					<table className="table-fixed overflow-auto xl:w-full">
						
							{
								tasks?.length === 0 ? <><h1 className="text-2xl text-center">There is no Task</h1></> :
								<>
								<thead>
							<tr>
								<th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
								<th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]"> Title </th>
								<th className="p-4 pb-8 text-sm font-semibold capitalize w-full"> Description </th>
								<th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]"> Tags </th>
								<th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Priority </th>
								<th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Options </th>
							</tr>
						</thead>
								<tbody>
									{ tasks.filter(task => task?.title.toLowerCase().includes(searchTerm.toLowerCase())).map(task => <Task 
										key={task.id}
										task={task} 
										handleEditTask={handleEditTask}
										handleDelete={handleDelete}
										handleFavorite={handleFavorite}
										/>)
									}
								</tbody>
								</>
							}
					</table>
				</div>
			</div>
		</div>
	</section>
  )
}
