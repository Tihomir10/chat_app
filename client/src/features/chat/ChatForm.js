export const ChatForm = () => {
  return (
    <form className='messaging-form'>
      <input id='message' name='message'/>
      <input id='submit-msg' type='submit' value='Send' />
    </form>
  )
}