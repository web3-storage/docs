import { Web3Storage } from 'web3.storage'
import { CarReader, CarWriter } from '@ipld/car'
import { encode } from 'multiformats/block'
import * as cbor from '@ipld/dag-cbor'
import { sha256 } from 'multiformats/hashes/sha2'

async function storeDagCBOR(value) {
  // encode the value into an IPLD block, using the cbor codec and sha256 hash function
  const block = await encode({ value, codec: cbor, hasher: sha256 })

  // create a new CarWriter, with the encoded block as the root
  const { writer, out } = CarWriter.create([block.cid])

  // add the block to the CAR and close it
  writer.put(block)
  writer.close()

  // create a new CarReader we can hand to Web3.Storage.putCar
  const reader = await CarReader.fromIterable(out)

  // upload to Web3.Storage using putCar
  const client = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN })
  const cid = await client.putCar(reader)
  console.log('stored dag-cbor data! CID:', cid)
}

storeDagCBOR({
  hello: 'world'
})