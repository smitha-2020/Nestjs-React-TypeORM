import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { postImage, postPhoto } from "../services/api-services";
import { CreatePhotoInfo } from "../models/photos.interfaces";

function CreatePhoto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePhotoInfo>();

  const [fileData, setFileData]: [File, Function] = useState<any>();
  const [fileUrl, setFileUrl]: [File, Function] = useState<any>();

  const handleFileChange = (file: any) => {
    const { files } = file.target as HTMLInputElement;

    if (files && files.length !== 0) {
      setFileData(files[0]);
      //file.target.value = null;
    }
  };
  useEffect(() => {
    if (!!fileData) {
      postImage(fileData)
        .then((fileUrl) => setFileUrl(fileUrl))
        .catch(console.error);
    }
  }, [fileData]);

  const onSubmitHandler = (data: CreatePhotoInfo) => {
    const formattedData: CreatePhotoInfo = {
      ...data,
      author: data.author,
      width: String(data.width),
      height: String(data.height),
      copiesDownloaded: String(data.copiesDownloaded),
      downloadUrl: `http://localhost:3000/photos/${fileUrl}`,
    };

    postPhoto(formattedData).then().catch(console.error);
    reset({
      author: "",
      width: "",
      height: "",
      copiesDownloaded: "",
      downloadUrl: "",
    });
  };
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-secondary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-2 text-uppercase">
                  Create Author Data
                </h2>
                <p className=" mb-5"></p>
                <Form className="mb-3" onSubmit={handleSubmit(onSubmitHandler)}>
                  <Form.Group className="mb-3" controlId="formGroupAuthor">
                    <Form.Label className="text-center">Author</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Author Name"
                      {...register("author", { required: true, maxLength: 20 })}
                    />
                    <Form.Label className="text-danger">
                      {errors.author && (
                        <span>
                          This field is required & can be only 20 Characters
                          Long.
                        </span>
                      )}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupWidth">
                    <Form.Label className="text-center">Width</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Image Width"
                      {...register("width", {
                        required: true,
                        min: 100,
                        max: 5000,
                      })}
                    />
                    <Form.Label className="text-danger">
                      {errors.width && (
                        <span>
                          This field is required & Value should be between 100
                          to 5000.
                        </span>
                      )}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupHeight">
                    <Form.Label className="text-center">Height</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Image Height"
                      {...register("height", {
                        required: true,
                        min: 100,
                        max: 5000,
                      })}
                    />
                    <Form.Label className="text-danger">
                      {errors.height && (
                        <span>
                          This field is required & Value should be between 100
                          to 5000.
                        </span>
                      )}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupUploadPhoto">
                    <Form.Label>Upload Photo</Form.Label>
                    <Form.Control
                      type="file"
                      {...register("downloadUrl")}
                      onChange={handleFileChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formGroupCopiesDownloaded"
                  >
                    <Form.Label className="text-center">
                      Copies Downloaded
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter copiesDownloaded"
                      {...register("copiesDownloaded", {
                        required: true,
                        min: 0,
                        max: 50000,
                      })}
                    />
                    <Form.Label className="text-danger">
                      {errors.copiesDownloaded && (
                        <span>
                          This field is required & Value should be between 0 to
                          50000.
                        </span>
                      )}
                    </Form.Label>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="secondary" type="submit">
                      Save
                    </Button>
                    <Button variant="secondary" type="reset" className="mt-3">
                      Reset
                    </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default CreatePhoto;
