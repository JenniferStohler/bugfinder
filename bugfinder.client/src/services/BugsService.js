import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    console.log(res.data)
  }

  async getBugById(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
    console.log(res.data)
  }

  async createBug(data) {
    await api.post('api/bugs', data)
  }

  async editBug(data, id) {
    await api.put('api/bugs/' + id, data)
    this.getBugById(id)
  }

  async deleteBug(id) {
    await api.delete('api/bugs/' + id)
  }
}

export const bugsService = new BugsService()
