const constants = {
  msg: {
    entryMissingFields: 'Entry missing {{0}}',
    wordExists: 'Word {0} already exists',
    wordNotExists: "Word {0} does not exist in the dictionary",
    entryCreateSuccess: 'Entry created successfully',
    entryDeleteSuccess: 'Entry deleted successfully',
    entryUpdateSuccess: 'Entry updated successfully',
    queryMissingKey: 'Query missing {{0}}',
  },
  err: {
    500: 'Internal server error',
    wordConflict: 'Word conflict',
    entryNotFound: 'Entry Not Found',
  }
}

export default constants
