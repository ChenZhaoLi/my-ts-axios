import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
    const context = new Axios()
    const instance = Axios.prototype.request.bind(context)

    extend(instance, context)
    // console.log(instance)
    return instance as AxiosInstance
}

const axios = createInstance()

export default axios