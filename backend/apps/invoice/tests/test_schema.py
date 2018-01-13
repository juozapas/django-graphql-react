from unittest import mock

import graphql
import pytest
from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory
from graphql_relay.node.node import to_global_id
from mixer.backend.django import mixer

from .. import schema

pytestmark = pytest.mark.django_db


def test_message_type():
    instance = schema.InvoiceType()
    assert instance


def test_resolve_all_invoices():
    mixer.blend('invoice.Invoice')
    mixer.blend('invoice.Invoice')
    q = schema.Query()
    res = q.resolve_all_invoices(None)
    assert res.count() == 2, 'Should return all invoices'


def test_resolve_invoice():
    msg = mixer.blend('invoice.Invoice')
    q = schema.Query()
    global_id = to_global_id('InvoiceType', msg.pk)
    res = q.resolve_invoice(None, **{'id': global_id})
    assert res == msg, 'Should return the requested invoice'


def test_create_message_mutation():
    user = mixer.blend('auth.User')
    mut = schema.CreateInvoiceMutation()

    data = {'number': 'TEST201801'}

    info = mock.create_autospec(graphql.execution.base.ResolveInfo)
    info.context.user = AnonymousUser()
    res = mut.mutate(None, info, **data)
    assert res.status == 403, 'Should return 403 if user is not logged in'

    info.context.user = user
    res = mut.mutate(None, info)
    assert res.status == 400, 'Should return 400 if there are form errors'
    assert 'number' in res.formErrors, (
        'Should have form error for invoice field')

    info.user = user
    res = mut.mutate(None, info, **data)
    assert res.status == 200, 'Should return 400 if there are form errors'
    assert res.invoice.pk == 1, 'Should create new invoice'



def test_user_type():
    instance = schema.UserType()
    assert instance


def test_resolve_current_user():
    q = schema.Query()
    req = RequestFactory().get('/')
    req.user = AnonymousUser()
    res = q.resolve_current_user(None, req, None)
    assert res is None, 'Should return None if user is not authenticated'

    user = mixer.blend('auth.User')
    req.user = user
    res = q.resolve_current_user(None, req, None)
    assert res == user, 'Should return the current user if is authenticated'