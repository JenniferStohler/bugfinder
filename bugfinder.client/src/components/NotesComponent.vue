<template>
  <div>
    <div class="card">
      <div class="card-body p-4 ml-3">
        <div>
          <h4>
            <!-- {{ noteProp.creator.picture }} -->
            {{ noteProp.creator.name }}
          </h4>
        </div>
        <div>
          {{ noteProp.body }}
        </div>
        <button type="submit" class="btn btn-danger ml-3 mt-2" @click="deleteNote(noteProp.id)" title="Delete">
          Delete
        </button>
        <!-- <button type="button"
                class="btn btn-warning text-white ml-3 mt-2"
                @click="editNote()"
                title="Edit Note"
                data-toggle="modal"
                data-target="#exampleModalTwo"
        >
          Edit Note
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { notesService } from '../services/NotesService'

export default {
  props: {
    noteProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      notes: computed(() => AppState.notes)
    })
    // onMounted(async() => {
    //   try {
    //     await notesService.getAllNotes(props.noteProp.id)
    //   } catch (error) {
    //     Notification.toast('Error' + error, 'error')
    //   }
    // })
    return {
      state,
      async deleteNote(id) {
        try {
          if (await Notification.confirmAction('Are You Sure You Want To Delete This Note?')) {
            await notesService.deleteNote(id)
            // await notesService.getAllNotes()
            Notification.toast('Note Deleted!', 'success')
          }
        } catch (error) {
          Notification.toast('You cannot delete someone elses note')
        }
      },
      async editNote() {
        try {
          console.log('hi')
          await notesService.editNote(state.newNote, state.note.id)
          state.newNote = {}
          Notification.toast('Bug Updated!', 'success')
        } catch (error) {
          Notification.toast('You cannot delete someone elses note')
        }
      }
    }
  }
}
</script>
