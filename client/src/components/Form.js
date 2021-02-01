function Form(props) {
  return (
      <form>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name='username' className="form-control" onChange={props.handleChange} />
          <span>{props.inputError}</span>
        </div>
        <button type="submit" className="btn btn-primary" onClick={props.sendUsername} >Join</button>
      </form>
  )
}

export default Form;