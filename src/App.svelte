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
						<button class="btn btn-info">
							{#if saveTask}Agregar {:else} Actualizar {/if}
						</button>
					</div>
				</div>
			</form>
		</li>
		<li class="list-group-item list-group-item-success">
			<div class="row">
				<div class="col-10">ToDo-List for Iron Bit by Ricoy</div>
				<div class="col-2">
					<button class="btn btn-dark"  on:click={deleteAllTask}>
						<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
						</svg>
					</button>
				</div>
			</div>
		</li>
		{#each lstTasks as task}
			<li class="list-group-item">
				<div class="row">
					<div class="col-10" id="contentTask">{task.content}</div>
					<div class="col-2">
						<button class="btn btn-primary" on:click={editTask(task)}>
							<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
								<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
							</svg>
						</button>
						<button class="btn btn-danger" on:click={deleteTask(task.id)}>
							<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
								<path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
								<path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
							</svg>
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