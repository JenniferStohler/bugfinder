<!----------------------------------------------TEMPLATE GOES HERE-------------------------------------------------------->
<template>
  <div class="container-fluid bg-success">
    <div class="row mb-3 mr-3">
      <div class="col-md-4 ml-4">
        <br>
        <div class="card d-flex shadow">
          <div class="card-body" title="New Bug Form">
            New Bug Form
            <form @submit.prevent="createBug">
              <div class="form-row d-flex">
                <div class="col">
                  <input type="text"
                         class="form-control"
                         id="inlineFormInput"
                         title="Your Name"
                         placeholder="Name..."
                         v-model="state.newBug.title"
                         required
                  >
                  <input type="text"
                         class="form-control"
                         id="inlineFormInput"
                         title="Bug Description"
                         placeholder="Bug Description..."
                         v-model="state.newBug.description"
                         required
                  >
                  <button type="submit" class="btn btn-secondary mt-2 text-white" title="Add A New Bug">
                    Add Bug
                  </button>
                  <!-- <button type="submit" class="btn btn-danger ml-3 mt-2" title="Delete">
                    Delete
                  </button> -->
                  <!-- <button type="button" class="btn btn-warning text-white ml-3 mt-2" title="Edit Bug" data-toggle="modal" data-target="#exampleModal">
                    Edit Bug
                  </button> -->
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-3">
      <div class="col-md-12">
        <div class="card d-flex flex-wrap shadow">
          <BugDetailsComponent v-for="bugDetail in state.bugs"
                               :key="bugDetail.id"
                               :bug-detail-prop="bugDetail"
          />
        </div>
      </div>
    </div>
    <!----------Modal---------->
    <!-- <div class="
                               modal"
                               tabindex="-1"
                               id="exampleModal"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">
                    Modal title
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <input type="text"
                         class="form-control"
                         id="inlineFormInput"
                         title="Edit Bug"
                         placeholder="Edit Bug Here..."
                         v-model="state.newBug.description"
                  />
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </bugdetailscomponent>
        </div> -->
  </div>
</template>

<!------------------------------------------------------FORM GOES HERE--------------------------------------------------->

<!------------------------------------------------------------------------------------------------------------------>

<!----------------------------------------------------JS CODE----------------------------------------------------------->

<script>
import BugDetailsComponent from '../components/BugDetailsComponent'
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'

export default {
  name: 'BugsPage',

  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      newBug: {}
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.newBug)
          state.newBug = {}
          await bugsService.getAllBugs()
          Notification.toast('Bug Reported!', 'success')
        } catch (error) {
          Notification.toast('You must be logged in to report a bug')
        }
        // router.push('BugDetailsPage')
      }
    }
  },
  components: {
    BugDetailsComponent
  }
}
</script>
