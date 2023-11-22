import {MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle} from 'mdb-react-ui-kit'
import React from 'react'
import {capitalize} from 'lodash'
import formatTime from '../utils/formatTime'

export default function DetailProduct({detailModal, setDetailModal, data}) {
	console.log(data)
	return (
		<>
			{
				data &&
				<MDBModal className='modal-xl' show={detailModal} setShow={setDetailModal} tabIndex='-1'>
					<MDBModalDialog scrollable>
						<MDBModalContent>
							<MDBModalHeader>
								<MDBModalTitle className='text-center'>Detail Product</MDBModalTitle>
								<MDBBtn
									className='btn-close'
									color='none'
									onClick={() => setDetailModal(!detailModal)}
								></MDBBtn>
							</MDBModalHeader>
							<MDBModalBody>
								<div className='py-3 '>
									<div className="card">
										<div className="card-body">
											<div>
												<div className="mb-3 row">
													<label className="col-sm-2 col-form-label">Name</label>
													<div className="col-sm-10">
														<p className=''>{capitalize(data?.name)}</p>
													</div>
												</div>
												<div className="mb-3 row">
													<label className="col-sm-2 col-form-label">Description</label>
													<div className="col-sm-10">
														<p className=''>{capitalize(data?.description)}</p>
													</div>
												</div>
												<div className="mb-3 row">
													<label className="col-sm-2 col-form-label">Price</label>
													<div className="col-sm-10">
														<p className=''>Rp{data?.price}</p>
													</div>
												</div>
												<div className="mb-3 row">
													<label className="col-sm-2 col-form-label">Category</label>
													<div className="col-sm-10">
														<p className=''>{capitalize(data?.category?.name)}</p>
													</div>
												</div>
												<div className="mb-3 row">
													<label className="col-sm-2 col-form-label">Created By</label>
													<div className="col-sm-10">
														<p className=''>{capitalize(data?.author?.name)}</p>
													</div>
												</div>
												<div className="mb-3 row">
													<label className="col-sm-2 col-form-label">Updated By</label>
													<div className="col-sm-10">
														<p className=''>{capitalize(data?.editor?.name) || '-----'}</p>
													</div>
												</div>
												<div className="mb-3 row">
													<label className="col-sm-2 col-form-label">Created at</label>
													<div className="col-sm-10">
														<p className=''>{formatTime(data?.created_at)}</p>
													</div>
												</div>
												<div className="mb-3 row">
													<label className="col-sm-2 col-form-label">Updated at</label>
													<div className="col-sm-10">
														<p className=''>{formatTime(data?.updated_at)}</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</MDBModalBody>
							<MDBModalFooter>
								<MDBBtn color='secondary' onClick={() => setDetailModal(!detailModal)}>
									Close
								</MDBBtn>
							</MDBModalFooter>
						</MDBModalContent>
					</MDBModalDialog>
				</MDBModal>
			}
		</>
	)
}
