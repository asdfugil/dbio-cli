declare module 'asciify-image' {
  type AsciifyOptions = {
    color: boolean
    fit: 'original' | 'box' | 'width' | 'height' | 'none'
    width: string | number
    height: string | number
    format: string
    c_ratio: number
  }
  function asciify(path: string,options:Partial<AsciifyOptions>,callback:(err:Error,asciiffied:string) => void): Promise<string>
  export default asciify
}