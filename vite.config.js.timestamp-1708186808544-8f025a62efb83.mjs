e="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1"
        >
          <span>Kembali</span>
        </Button>
        <Button variant="gradient" color="green" onClick={onSubmit}>
          <span>Perbarui</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

MyProfilEdit.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleOpen: PropTypes.func,
  data: PropTypes.object,
  mutate: PropTypes.func,
};

export default MyProfilEdit;
                                                                                                                                                                                                                                                                                                                                                                                                                                                  