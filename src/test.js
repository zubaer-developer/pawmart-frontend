// Update listing by ID
app.put("/listings/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const updatedData = req.body;

    // Remove _id from update data if present
    delete updatedData._id;

    // Add updated timestamp
    updatedData.updatedAt = new Date();

    const result = await listingsCollection.updateOne(query, {
      $set: updatedData,
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json({
      success: true,
      message: "Listing updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update listing",
      error: error.message,
    });
  }
});

// Update listing by ID (Using PATCH for partial updates)
app.patch("/listings/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const updatedData = req.body;

    // Remove _id from update data if present to avoid MongoDB error
    delete updatedData._id;

    // Add updated timestamp
    updatedData.updatedAt = new Date();

    const result = await listingsCollection.updateOne(query, {
      $set: updatedData,
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json({
      success: true,
      message: "Listing updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update listing",
      error: error.message,
    });
  }
});
