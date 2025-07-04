import User from "../models/user.Model.js";

export async function signup(req,res){
      const {username,email,password} = req.body;
      
      try{
            if(!email || !username || !password){
                  return res.json({success:false,message:"All field required"});
            }      
            const isPresent = await User.findOne({username});
            if(isPresent){
                  return res.json({success:false, message:"User already exist"})
            }
            const newUser=await User.create({email,username,password});
            res.json({success:true,newUser});
      }
      catch(error){
            return res.json({success:false ,message:"Error at signup"});
      }
}
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Validate inputs
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        // Check password
        const isMatch = await user.isPasswordMatch(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Password mismatch" });
        }

        // Successful login
        return res.status(200).json({ success: true, message: `Welcome ${user.username}` });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Login error" });
    }
}

