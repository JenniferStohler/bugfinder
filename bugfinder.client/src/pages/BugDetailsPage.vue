<!----------------------------------------------TEMPLATE GOES HERE-------------------------------------------------------->
<template>
  <div class="container-fluid bg-success" v-if="state.bug.id">
    <div class="row mb-5 mr-3">
      <div class="col">
        <br>
        <div class="card d-flex shadow">
          <div class="card-body">
            <button @click="deleteBug"
                    class="btn btn-danger ml-3 mt-2"
                    title="Close Bug"
                    v-if="state.bug.closed == false && state.bug.creatorId == state.creator.id"
            >
              Close Bug
            </button>
            <button type="
                    button"
                    class="btn btn-warning text-white ml-3 mt-2"
                    title="Edit Bug"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    v-if="state.bug.closed == false && state.bug.creatorId == state.creator.id"
            >
              Edit Bug
            </button>
            <div title="Title">
              <span>Title:
                <div>
                  <p>
                    {{ state.bug.title }}
                  </p>
                </div>
              </span>
            </div>
            <div title="Reported By">
              <span>Reported By:
                <div>
                  {{ state.bug.creator.name }}

                </div></span>
            </div>
            <div title="Status">
              <span>Status:
                <div>
                  <p>
                    {{ state.bug.closed ? "Closed" : "Open" }}
                  </p>
                </div>
              </span>
            </div>
            <div title="Description">
              <span>Description:
                <div>
                  {{ state.bug.description }}
                </div>
              </span>
            </div>
          </div>
          <div class="row mb-3 mr-3">
            <div class="col-md-4 ml-4">
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col">
            <!-- <BugComponent v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" /> -->
            <h1>Notes:</h1>
            <NotesComponent v-for="note in state.notes" :key="note.id" :note-prop="note" />
          </div>
          <div class="card my-3 ml-3 mr-3 p-3 d-flex shadow" style="width: 100rem;">
            <div class="card-body">
              <h5 class="card-title" title="Notes">
                ADD NOTES
              </h5>
              <p class="card-text">
              </p>
              <form @submit.prevent="createNote">
                <div class="form-row">
                  <div class="col">
                    <div class="col auto">
                      <label class="sr-only" for="inlineFormInput">Add Note</label>
                      <input type="text"
                             class="form-control"
                             id="inlineFormInput"
                             placeholder="Add Note"
                             v-model="state.newNote.body"
                             required
                      >
                      <div class="col auto">
                        <button type="submit" class="btn btn-secondary mt-2 text-white" title="Add A New Note">
                          Add Note
                        </button>
                        <!-- <button type="submit" class="btn btn-danger ml-3 mt-2" title="Delete">
                          Delete
                        </button>
                        <button type="button" class="btn btn-warning text-white ml-3 mt-2" title="Edit Note" data-toggle="modal" data-target="#exampleModal">
                          Edit Note
                        </button> -->
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!------------------------Modal--------------------------------->
  <div class="modal" tabindex="-1" id="exampleModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            New Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editBug">
            <div class="form-group">
              <label class="sr-only" for="newBugName"></label>
              <input type="text"
                     class="form-control"
                     id="newBugName"
                     placeholder="Enter New Bug Name"
                     v-model="state.newBugName.title"
              >
            </div>

            <button type="submit" class="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<!------------------------------------------------------------------------------------------------------------------>

<!----------------------------------------------------JS CODE----------------------------------------------------------->

<script>
import { reactive, computed, onMounted } from 'vue'
// import BugComponent from '../components/BugComponent'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export default {
  name: 'BugDetails',

  setup() {
    const route = useRoute()
    const state = reactive({
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      newNote: {},
      newBugName: {},
      creator: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
        await notesService.getAllNotes(route.params.id)
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state,
      async createNote() {
        console.log('hi')
        try {
          state.newNote.bug = route.params.id
          await notesService.createNote(state.newNote)
          state.newNote = {}
          await notesService.getAllNotes(route.params.id)
          Notification.toast('Note Created!', 'success')
        } catch (error) {
          Notification.toast('You need to log in to add a note')
        }
      },
      async editBug() {
        try {
          console.log('hi')
          await bugsService.editBug(state.newBugName, state.bug.id)
          state.newBugsName = {}
          Notification.toast('Bug Updated!', 'success')
        } catch (error) {
          Notification.toast('Error:' + error, 'error')
        }
      },
      async deleteBug() {
        try {
          if (await Notification.confirmAction('Are You Sure You Want To Delete This?')) {
            await bugsService.deleteBug(state.bug.id)
            await bugsService.getAllBugs()
            Notification.toast('Bug Deleted', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }

    }
  }
  // components: {
  //   BugComponent
  // }
}
</script>
