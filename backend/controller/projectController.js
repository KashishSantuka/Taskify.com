import Project from "../model/project.js";

export const getProject = async (req, res) => {
  try {
    console.log("Hello1")
    const id = req.userId;
    console.log(id)
    console.log("Hello2")
   const fetchAllData = await Project.find({ ownerBy: id }).populate(
      "ownerBy",
      "name email"
    );
    console.log("hello3")

    console.log("Fetch all data ", fetchAllData);

    if (fetchAllData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched all projects",
      data: fetchAllData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

// Post a New Project
export const postProject = async (req, res) => {
  try {
    const { title, description, date, ownerBy } = req.body;

    console.log("post body", req.body);

    if (!title || !description || !date) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and date are required",
      });
    }

    console.log("1");

    const existingProject = await Project.findOne({ title });

    if (existingProject) {
      return res.status(409).json({
        success: false,
        message: "Project already exists, please use a different title",
      });
    }

    console.log("2");

    const newProject = new Project({
      title,
      description,
      date,
      ownerBy: req.userId,
    });
    await newProject.save();
    console.log("Hello i am saved");

    console.log(newProject);
    console.log("Project Saved Successfully");
    return res.status(201).json({
      success: true,
      message: "Project saved successfully",
      data: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error saving the project",
      error: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project_Id = req.params.id;

    if (!project_Id) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const removeData = await Project.findByIdAndDelete(project_Id);

    if (!removeData) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted the project",
      data: removeData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting the project",
      error: error.message,
    });
  }
};
