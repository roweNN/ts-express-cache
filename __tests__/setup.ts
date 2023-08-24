process.env.port = '3000'

import express from 'express'
import {Server} from 'net'

console.log('Process.version: ', process.version)

describe('Index', () => {
  it('should work', async () => {
    const listen = jest.spyOn(Server.prototype, 'listen')
    jest.mock("@src/app", () => ({
      createServer: jest.fn().mockReturnValue(express()),
    }))

    await import('@src/app')
    expect(listen).toHaveBeenCalled()
    const server = listen.mock.results[0].value as Server
    setImmediate(() => {
      server.close()
    })
    listen.mockRestore()
  })
})