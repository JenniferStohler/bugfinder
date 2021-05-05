import { AppState } from '../AppState'
import { api } from './AxiosService'
// import { logger } from '../utils/Logger'

class NotesService {
  async getAllNotes(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.notes = res.data
  }

  async createNote(data) {
    await api.post('api/notes', data)
  }

  async deleteNote(id) {
    await api.delete('api/notes/' + id)
  }
}

export const notesService = new NotesService()
