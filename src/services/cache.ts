//import fs from 'fs';
import axios from 'axios'
import client from '@config/redis'

const DEFAULT_CACHE_TIME = 60000 * 60 * 24 * 7 // 7 days
// const BASE_DIR = './cache/data/'

export function save(name: string, data: string) {
  // return new Promise((resolve) => {
  //   const filename = name
  //   fs.writeFile(`${BASE_DIR}${filename}.json`, data, (err) => {
  //     if (err) {
  //       resolve(false);
  //     } else {
  //       resolve(true);
  //     }
  //   })
  // })
  return client.set(`cache:${name}`, data)
}

export async function chech(name: string, cacheTime?: number) {
  ///const filename = name
  // return new Promise((resolve) => {
  //   fs.access(`${BASE_DIR}${filename}.json`, fs.constants.F_OK, (err) => {
  //     if (err) {
  //       console.log('File not exist')
  //       resolve(false)
  //     }
  //     else {
  //       if (Date.now() - fs.statSync(`${BASE_DIR}${filename}.json`).mtimeMs > cacheTime) {
  //         console.log('File expired')
  //         resolve(false)
  //       } else {
  //         resolve(true)
  //       }
  //     }
  //   });
  // })
  const CACHE_TIME = cacheTime || DEFAULT_CACHE_TIME
  const exists = await client.exists(`cache:${name}`)
  if (!exists) return false
  const item = await client.get(`cache:${name}`) as string
  const result = JSON.parse(item)
  if (!result.timestamp) return false
  if ((result.timestamp + CACHE_TIME) < Date.now()) {
    console.log('File expired')
    return false
  }
  //console.log('File exist')
  return true
}


export async function get(name: string) {
  // return new Promise((resolve, reject) => {
  //   // check if exist in file.json
  //   const filename = name

  //   fs.readFile(`${BASE_DIR}${filename}.json`, 'utf8', (err, data) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve(data);
  //     }
  //   })
  // })
  return await client.get(`cache:${name}`)
}

export async function auto({ url, key, expireTime }: { url: string, key: string, expireTime?: number }) {
  // check if exist in file.json

  const exits = await chech(key, expireTime)
  if (exits) {
    const data = await get(`${key}`)
    //  if (!data) return axios(`${base}${url}`).then(res => res.data)
    if (data != null) {
      const result = JSON.parse(data)
      return result.data
    }
  }

  const responseData = await axios(`${url}`).then(res => res.data)
  await save(`${key}`, JSON.stringify({
    data: responseData,
    timestamp: Date.now()
  }))
  return responseData

}