<script>
	import {db} from "./firebase";
	import toastr from 'toastr';

	let task = {
		content: ""
	}

	let lstTasks = [];
	let saveTask = true;
	let currentId;

	const addTask = async () => {
		await db.collection('tasks').doc().set({ // Create collection in db
			...task, // Take all data in object,
			index: lstTasks.length + 1
		});
		toastr.success('ToDo ha sido agregada', {
			timeOut: 5000,
			progressBar: true,
			positionClass: 'toast-bottom-right'
		});
	}

	const deleteTask = async (id) => {
		await db.collection('tasks').doc(id).delete();
		toastr.error('ToDo ha sido eliminada', {
			timeOut: 5000,
			progressBar: true,
			positionClass: 'toast-bottom-right'
		});
	}

	const deleteAllTask = async () => {
		await lstTasks.forEach(currentTask => {
			db.collection('tasks').doc(currentTask.id).delete();
		});
		toastr.warning('Se ha eliminado Todo los ToDo', {
			timeOut: 5000,
			progressBar: true,
			positionClass: 'toast-bottom-right'
		});
	}

	const editTask = (currentTask) => {
		task.content = currentTask.content;
		currentId = currentTask.id;

		saveTask = false;
	}

	const updateTask = async () => {
		await db.collection('tasks').doc(currentId).update(task);
		toastr.success('ToDo ha sido actualizada', {
			timeOut: 5000,
			progressBar: true,
			positionClass: 'toast-bottom-right'
		});
		saveTask = true;
	}

	const clearInput = () => {
		task = {content: ''}
		saveTask = true;
	}

	const handleSubmit = () => {
		if (saveTask) addTask();
		else updateTask();

		task = {content: ''} // Set inputs form empty
	}


	// GET ALL TASK
	db.collection('tasks').onSnapshot(querySnapshot => {
		lstTasks = [];
		querySnapshot.forEach(docTask => { 
			lstTasks.push({
				...docTask.data(),
				id: docTask.id
			}); 
		});
	});
</script>

<style>
</style>



<center>
	<ul class="list-group">
		<li class="list-group-item">
			<form on:submit|preventDefault={handleSubmit}> <!-- Call to function in Svelte -->
				<div class="row">
					<div class="col-10">
						<input required class="form-control" bind:value={task.content} type="text" placeholder="Write a new task">
					</div>
					<div class="col-2">
						<button class="btn btn-light">
							{#if saveTask} 
								<img src="./img/add.png" class="imgRequired" alt=""> 
							{:else} 
								<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-check-all" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
							  	</svg> 
							{/if}
						</button>
						{#if !saveTask} 
								<button class="btn btn-light" on:click={clearInput}>
									<img src="./img/close.png" class="imgRequired" alt="">
								</button>
						{/if}
					</div>
				</div>
			</form>
		</li>
		<li class="list-group-item list-group-item-success">
			<div class="row">
				<div class="col-10">ToDo-List for Iron Bit by Ricoy</div>
				<div class="col-2">
					<button class="btn btn-ligth"  on:click={deleteAllTask}>
						<img src="./img/reBin.png" class="imgRequired" alt="">
					</button>
				</div>
			</div>
		</li>
		{#each lstTasks as task}
			<li class="list-group-item">
				<div class="row">
					<div class="col-10" id="contentTask">{task.content}</div>
					<div class="col-2">
						<button class="btn btn-ligth" on:click={editTask(task)}>
							<svg width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
								<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
							</svg>
						</button>
						<button class="btn btn-light" on:click={deleteTask(task.id)}>
							<img src="./img/close.png" class="imgRequired" alt="">
						</button>
					</div>
				</div>
			</li>
		{/each}
		{#if lstTasks.length == 0} 
			<li class="list-group-item">No hay ToDo's, tomate un cafe!</li>
		{/if}
	</ul>
</center>