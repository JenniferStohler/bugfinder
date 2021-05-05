<template>
  <div class="col">
    <router-link :to="{name: 'BugDetails', params: {id: bugDetailProp.id}}">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" title="Bug Name">
              Bug
            </th>
            <th scope="col" title="Creator">
              Creator
            </th>
            <th scope="col" title="Last Modified">
              Last Modified
            </th>
            <th scope="col" title="Status">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {{ bugDetailProp.title }}
            </td>
            <td> {{ bugDetailProp.creator.name }}</td>
            <td>
              {{ bugDetailProp.updatedAt.slice(5,10) }}
              -
              {{ bugDetailProp.updatedAt.slice(0,4) }}
            </td>
            <td :class="{ active: bugDetailProp.closed == true, 'text-primary': !bugDetailProp.closed}">
              {{ bugDetailProp.closed }}
            </td>
          </tr>
        </tbody>
      </table>
      <tr>
        <td>
        </td>
      </tr>
    </router-link>
  </div>
</template>

<script>
// IMPORTS GO HERE
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import bugsService from '../services/BugsService'
import Notification from '../utils/Notification'

export default {
  name: 'BugDetails',
  props: {
    bugDetailProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      bugDetail: computed(() => AppState.bugDetail),
      newBugDetailName: {}
    })
    return {
      state,
      async deleteBug(id) {
        try {
          if (await Notification.confirmAction('Are You Sure You Want To Delete This?')) {
            await bugsService.deleteBug(id)
            await bugsService.getAllBugs()
            Notification.toast('Bug Deleted', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async editBug() {
        try {
          await bugsService.editBug(state.newBugName, props.bugProp.id)
          state.newBugName = {}
          Notification.toast('Bug Updated!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
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
