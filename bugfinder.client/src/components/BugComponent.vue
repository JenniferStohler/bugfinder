<!---------------------------------HTML TEMPLATE--------------------------------------------------------------->
<template>
  <div class="row">
    <div class="col-4">
      <div class="card p-3 my-3 bg-dark">
        <div class="row">
          <div class="col">
            <router-link :to="{name: 'Bugs', params: {id: bugProp.id}}">
              <h3>
                {{ bugProp.title }}
              </h3>
            </router-link>
          </div>
          <div class="col">
            <router-link :to="{name: 'BugDetails', params: {id: bugProp.id}}">
              <h3>
                {{ bugProp.title }}
              </h3>
            </router-link>
          </div>
          <div class="col">
            <button type="button" class="btn btn-secondary" @click="deleteBug(bugProp.id)">
              Delete Bug
            </button>
          </div>
        </div>
        <!-- EDIT MODAL -->
        <div class="row">
          <p class="mt-5">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="`#bugModal${bugProp.id}`">
              Edit Bug
            </button>
          </p>

          <!-- Modal -->
          <div class="modal fade"
               :id="`exampleModal`"
               tabindex="-1"
               role="dialog"
               aria-labelledby="exampleModalLabel"
               aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit {{ bugProp.title }}
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <!-- FORM -->
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
                <!-- ---------- -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!------------------------------------------------------------------------------------------------------------->
<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'

export default {
  name: 'Bug',
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      newBugName: {}
    })
    return {
      state,
      async deleteBug(id) {
        try {
          if (await Notification.confirmAction('Are You Sure You Want To Close This Bug?')) {
            await bugsService.deleteBug(id)
            await bugsService.getAllBugs()
            Notification.toast('Bug Closed!', 'success')
          }
        } catch (error) {
          Notification.toast('Error:' + error, 'error')
        }
      },
      async editBug() {
        try {
          console.log('hi')
          await bugsService.editBug(state.newBugName, props.bugProp.id)
          state.newBugsName = {}
          Notification.toast('Bug Updated!', 'success')
        } catch (error) {
          Notification.toast('Error:' + error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="css">
h3{
  outline: 1rem;
  outline-color: white;
  margin: 0;
  padding: 0;
}
</style>
