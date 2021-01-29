function Form() {
  return (
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  )
}

export default Form;