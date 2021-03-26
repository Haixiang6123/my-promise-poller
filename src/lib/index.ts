import {CANCEL_TOKEN, delay, timeout} from './utils'
import {Options, strategies} from './contants'

const promisePoller = (options: Options) => {
  const strategy = strategies[options.strategy] || strategies['fixed-interval']

  const mergedOptions = {...options, ...strategy.defaults}

  const {taskFn, masterTimeout, taskTimeout, shouldContinue, retries = 5} = mergedOptions

  let polling = true
  let timeoutId: null | number
  let rejections: Array<Error | string> = []
  let retriesRemain = retries

  return new Promise((resolve, reject) => {
    if (masterTimeout) {
      timeoutId = window.setTimeout(() => {
        reject(new Error('Master timeout'))
        polling = false
      }, masterTimeout)
    }

    // 轮询函数
    const poll = () => {
      let taskResult = taskFn()

      // 同步结束任务
      if (taskResult === false) {
        taskResult = Promise.reject(taskResult)
        reject(rejections)
        polling = false
      }

      let taskPromise = Promise.resolve(taskResult)

      if (taskTimeout) {
        taskPromise = timeout(taskPromise, taskTimeout)
      }

      taskPromise
        .then(result => {
          if (shouldContinue(null, result)) {
            const nextInterval = strategy.getNextInterval(retriesRemain, options)
            // 继续轮询
            delay(nextInterval).then(poll)
          } else {
            // 不需要轮询，有 timeoutId 则清除
            if (timeoutId !== null) {
              clearTimeout(timeoutId)
            }
            // 结束并返回最后一次 taskFn 的结果
            resolve(result)
          }
        })
        .catch((error: Error) => {
          // 异步结束任务
          if (error.message === CANCEL_TOKEN) {
            reject(rejections)
            polling = false
          }

          rejections.push(error)

          if (--retriesRemain === 0 || !shouldContinue(error)) {
            reject(rejections)
          } else if (polling) {
            const nextInterval = strategy.getNextInterval(retriesRemain, options)
            // 重试轮询
            delay(nextInterval).then(poll);
          }
        })
    }

    // 第一次轮询
    poll()
  })
}

export default promisePoller
