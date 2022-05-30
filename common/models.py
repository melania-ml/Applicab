import django
from django.db import models


# Create your models here.
class SoftDeletableQS(models.QuerySet):
    """A queryset that allows soft-delete on its objects"""

    def delete(self, **kwargs):
        self.update(is_deleted=True, **kwargs)

    def hard_delete(self, **kwargs):
        super().delete(**kwargs)

    def un_delete(self, **kwargs):
        self.update(is_deleted=False, **kwargs)


class SoftDeletableManager(models.Manager):
    """Manager that filters out soft-deleted objects"""

    def get_queryset(self):
        return SoftDeletableQS(
            model=self.model, using=self._db, hints=self._hints
        ).filter(
            is_deleted=False
        )


class ReturnSoftDeleteManager(models.Manager):
    """Manager that filters out soft-deleted objects"""

    def get_queryset(self):
        return SoftDeletableQS(
            model=self.model, using=self._db, hints=self._hints
        ).filter(
            is_deleted=True
        )


class CommonBase(models.Model):
    is_deleted = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now=False, default=django.utils.timezone.now)
    updated_date = models.DateTimeField(auto_now=True)

    objects = SoftDeletableManager()
    deleted_objects = ReturnSoftDeleteManager()

    class Meta:
        db_table = 'common_base'
        abstract = True

    def delete(self):
        """Softly delete the entry"""
        self.is_deleted = True
        self.save()

    def hard_delete(self):
        """Remove the entry from the database permanently"""
        super().delete()

    def un_delete(self):
        self.is_deleted = False
        self.save()
